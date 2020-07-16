const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { ExpressPort } = require('../config/vconf');
const app = new express();

const info = process.argv.filter(element => /--project=/.test(element))[0];
const project = info.split('=')[1];

const webpack = require('webpack');
const getWebpackDevConfig = require('../webpack/webpack.dev');
const compiler = webpack(getWebpackDevConfig(project));

const net = require('net');

function portIsOccupied(port) {
    const server = net.createServer().listen(port);
    return new Promise((resolve, reject) => {
        server.on('listening', () => {
            console.log(`the server is runnint on port ${port}`);
            server.close();
            resolve(port);
        });

        server.on('error', err => {
            if (err.code === 'EADDRINUSE') {
                // 如占用端口号+1
                resolve(portIsOccupied(port + 1));
                console.log(`this port ${port} is occupied.try another.`);
            } else {
                reject(err);
            }
        });
    });
}
portIsOccupied(ExpressPort).then(port => {
    app.use(require('webpack-dev-middleware')(compiler, {
        // writeToDisk: true,
    }));
    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    const server = app.listen(port, (res, res1) => {
        const { port } = server.address();
        const address = `http://localhost:${port}/index.html`;
        console.log('应用实例，访问地址为 http://%s:%s/%s', 'http:localhost', port, project);
        const c = require('child_process');
        // 使用默认浏览器打开
        c.exec(`start ${address}`);
    });
});
