const Config = {
    // express 服务端口
    ExpressPort: 4040,

    // Websocket 服务端口
    WebsocketPort: 4141,

    // 部署环境有效值
    NodeEnvs: ['dev', 'devprod', 'prod'],

    // 服务器环境有效值
    DevEnvs: ['dev', 'prepro', 'prod'],

    ProjectList: ['ktu', 'blog', 'mark', 'code', 'three'],
};

module.exports = Config;
