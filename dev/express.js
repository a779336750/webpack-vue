const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const _vconf = require('../config/vconf');

const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');

const app = new express();

const targetHost = 'http: localhost:3030';

// const WebSocket = require('ws');
const info = process.argv.filter(element => /--project=/.test(element))[0];
const project = info.split('=')[1];

const webpack = require('webpack');
const getWebpackDevConfig = require('../webpack/webpack.dev');
const compiler = webpack(getWebpackDevConfig(project));
app.use(require('webpack-dev-middleware')(compiler, {
    // writeToDisk: true,
}));
app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
}));
/**
 * 请求代理
 */
app.use('/ajax/*', createProxyMiddleware({
    target: targetHost,
    changeOrigin: true,
    secure: false,
    cookieDomainRewrite: {
        '*': 'localhost',
    },
}));

// app.use('/', express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const server = app.listen(_vconf.ExpressPort, (res, res1) => {
    const { port } = server.address();
    console.log('应用实例，访问地址为 http://%s:%s/%s', 'http:localhost', port, project);
});
