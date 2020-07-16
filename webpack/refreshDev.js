const _vconf = require('../config/vconf');

let socket = null;

function connectStart() {
    socket = new WebSocket(`ws://localhost:${_vconf.WebsocketPort}/refresh`);
    socket.addEventListener('open', event => {
        console.log('Websocket connected !');
    });
    // 获取到消息为refresh，则进行页面刷新
    socket.addEventListener('message', event => {
        if (event.data === 'refresh') {
            window.location.reload();
        }
    });
    // 监听到websocket已断开，则尝试重新连接，服务器重新开启服务时就能自动连接
    socket.addEventListener('close', event => {
        console.log('websocket is closed, waiting for reconnecting...');
        const interval = setInterval(() => {
            if (socket.readyState === 3) {
                connectStart();
            } else {
                clearInterval(interval);
            }
        }, 3000);
    });
    // 监听到websocket连接出错后，则尝试重新连接，服务器重新开启服务时就能自动连接
    socket.addEventListener('error', event => {
        console.log('connect error, waiting for reconnecting...');
        const interVal = setInterval(() => {
            if (socket.readyState === 3) {
                connectStart();
            } else {
                clearInterval(interVal);
            }
        }, 3000);
    });
}

connectStart();

