const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const multer = require('multer');

const _vconf = require('../config/vconf');

const {createProxyMiddleware} = require('http-proxy-middleware');

const path = require('path');

const app = new express();
const upload = new multer();

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


app.use('/', express.static(path.join(__dirname,'../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
const server =app.listen(_vconf.ExpressPort, ()=>{
    const {host,port} = server.address();
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
