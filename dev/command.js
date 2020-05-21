#! /usr/bin/env node
const {program} = require('commander');
const _ = require('lodash');
const chalk = require('chalk');
const _vconf = require('../config/vconf');
const {exec} = require('child_process');
const net = require('net');
const success = chalk.green;
const info = chalk.blue;
const error = chalk.bold.red;

// 定义一些指令集合
const command = {
    Webpack: 'webpack',
    RunExpress: 'node dev/express.js',
};

function checkExpress() {
    const port = _vconf.ExpressPort;
    return new Promise((resolve,reject) => {
        const server = net.createServer().listen(port);
        server.on('listening', () => {
            server.close();
            resolve();
        });

        // 端口已经被使用
        server.on('error', err => {
            if (err.code === 'EADDRINUSE') {
                reject();
            }
        });
    })
}

function runExpress() {
    checkExpress().then(() => {
        console.log(success('---------启动Express服务---------'));
        const cmd = command.RunExpress;
        const workerProcess = exec(cmd,()=>{});
        workerProcess.stdout.on('data', data => {
            console.log(data);
        });
        workerProcess.stderr.on('data', data => {
            console.log(data);
        });
    }).catch(error=>{
        console.log(error);
    });
}

function execWebpack(options) {
    const commandObj = validateWebpack(options);
    if (!commandObj) {
        process.exit();
        return;
    }
    const cmd = 'webpack --watch --config webpack\\ktu.dev.js';
    const {nodeEnv, devEnv} = commandObj;
    console.log(success('---------启动Webpack服务---------'));
    console.log(info('---------------------------------'));
    console.log(info(`---------部署环境为:${nodeEnv}---------`));
    console.log(info(`---------服务器环境为:${devEnv}---------`));

    // 设置环境变量
    process.env.NODE_ENV = nodeEnv;
    process.env.DEV_ENV = devEnv;
    console.log(info(`---------运行：${cmd}---------`));

    const workerProcess = exec(cmd);
    // 监听执行执行过程中的输出信息，并打印出来
    workerProcess.stdout.on('data', data => {
        console.log(data);
    });

    workerProcess.stderr.on('data', data => {
        console.log(data);
    });

}

function buildWebpack() {
    const cmd = `webpack --config webpack\\ktu.prod.js`;
    console.log(info(`---------运行：${cmd}---------`));
    // 设置环境变量
    process.env.NODE_ENV = 'dev';
    process.env.DEV_ENV = 'dev';
    const workerProcess = exec(cmd);
    workerProcess.stdout.on('data', data => {
        console.log(data);
    })
    workerProcess.stderr.on('data', data => {
        console.log(data);
    })
}

function validateWebpack(options) {
    const {nodeEnv, devEnv} = options;

    if (_.indexOf(_vconf.NodeEnvs, nodeEnv) < 0) {
        console.error(error(`##部署环境错误，有效值为：${_vconf.NodeEnvs}`));
        return false;
    }
    if (_.indexOf(_vconf.DevEnvs, devEnv) < 0) {
        console.error(error(`##服务器环境错误，有效值为：${_vconf.DevEnvs}`));
        return false;
    }
    const envType = nodeEnv === 'prod' ? 'prod' : 'dev';
    const isWatch = nodeEnv === 'dev' ? '--watch' : '';
    const cmd = `${command.Webpack} webpack\\ktu.${envType}.js`;
    return {
        nodeEnv,
        devEnv,
        cmd,
    }
}

program
    .command('run')
    .alias('r')
    .description('运行项目')
    .option('-O, --open', '启动web服务')
    .option('-N,--node-env <itemName>', '部署环境变量', 'dev')
    .option('-D,--dev-env <itemName>', '服务器环境变量', 'dev')
    .action(function (option, otherD, cmd) {
        if (option.open) {
            console.log('启动web服务');
            runExpress();
        }
        execWebpack({
            nodeEnv: option.nodeEnv,
            devEnv: option.devEnv,
        });
    });

program.on('command:*', function (operands) {
    console.error(`error: unknown command '${operands[0]}'`);
});
program.on('--help', function (operands) {
    console.log('');
    console.log('执行示例');
    console.log('');
    console.log('$ we run -O ');
});

program.command('build')
    .alias('b')
    .description('构建生产环境')
    .action(function (option, otherD, cmd) {
        buildWebpack();
    });

program.parse(process.argv);
