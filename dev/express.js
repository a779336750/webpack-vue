const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const _vconf = require('../config/vconf');

const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');

const app = new express();
const expressWs = require('express-ws')(app);

const targetHost = 'http: localhost:3030';
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

const info = process.argv.filter(element => /--project=/.test(element))[0];
const project = info.split('=')[1];
app.use(`/${project}`, express.static(path.join(__dirname, `../dist/${project}`)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const server = app.listen(_vconf.ExpressPort, (res, res1) => {
    const { port } = server.address();
    console.log('应用实例，访问地址为 http://%s:%s/%s', 'http:localhost', port, project);
});
const events = require('events');
const emiter = new events.EventEmitter();

app.ws('/echo', (ws, req) => {
    emiter.on('compileDone', () => {
        ws.send('done');
    });
});

app.get('/compileDone', (req, res) => {
    emiter.emit('compileDone');
});
