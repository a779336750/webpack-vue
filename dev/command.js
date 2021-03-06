#! /usr/bin/env node
const { program } = require('commander');
const _ = require('lodash');
const chalk = require('chalk');
const _vconf = require('../config/vconf');
const { exec } = require('child_process');
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

    return new Promise((resolve, reject) => {
        const server = net.createServer().listen(port);

        server.on(
            'listening',
            () => {
                server.close();
                resolve();
            },
        );

        // 端口已经被使用
        server.on(
            'error',
            err => {
                console.log(error('端口已被占用'));
                if (err.code === 'EADDRINUSE') {
                    reject();
                }
            },
        );
    });
}

function runExpress(config) {
    const { project } = config;

    console.log(success('---------启动Express服务---------'));
    const cmd = `${command.RunExpress} --project=${project}`;
    const workerProcess = exec(
        cmd,
        () => {},
    );

    workerProcess.stdout.on(
        'data',
        data => {
            console.log(data);
        },
    );
    workerProcess.stderr.on(
        'data',
        data => {
            console.log(data);
        },
    );
}

function buildWebpack(options) {
    const commandObj = validateWebpack(options);

    if (!commandObj) {
        process.exit();

        return;
    }
    const { nodeEnv, devEnv, cmd, project } = commandObj;

    console.log(success('---------启动Webpack服务---------'));
    console.log(info('---------------------------------'));
    console.log(info(`---------部署项目为为:${project}---------`));
    console.log(info(`---------部署环境为:${nodeEnv}---------`));
    console.log(info(`---------服务器环境为:${devEnv}---------`));

    // 设置环境变量
    process.env.NODE_ENV = nodeEnv;
    process.env.DEV_ENV = devEnv;
    console.log(info(`---------运行：${cmd}---------`));

    const workerProcess = exec(cmd);
    // 监听执行执行过程中的输出信息，并打印出来

    workerProcess.stdout.on(
        'data',
        data => {
            console.log(data);
        },
    );

    workerProcess.stderr.on(
        'data',
        data => {
            console.log(data);
        },
    );
}

function validateWebpack(options) {
    const { nodeEnv, devEnv, project } = options;

    if (_.indexOf(
        _vconf.ProjectList,
        project,
    ) < 0) {
        console.error(error(`##部署环境错误，项目不存在，有效的项目有${_vconf.ProjectList}`));

        return false;
    }
    if (_.indexOf(
        _vconf.NodeEnvs,
        nodeEnv,
    ) < 0) {
        console.error(error(`##部署环境错误，有效值为：${_vconf.NodeEnvs}`));

        return false;
    }
    if (_.indexOf(
        _vconf.NodeEnvs,
        nodeEnv,
    ) < 0) {
        console.error(error(`##部署环境错误，有效值为：${_vconf.NodeEnvs}`));

        return false;
    }
    if (_.indexOf(
        _vconf.DevEnvs,
        devEnv,
    ) < 0) {
        console.error(error(`##服务器环境错误，有效值为：${_vconf.DevEnvs}`));

        return false;
    }
    const isWatch = nodeEnv === 'dev' ? '--watch' : '';
    const envType = nodeEnv === 'prod' ? 'prod' : 'dev';
    const cmd = `${command.Webpack} ${isWatch} --config webpack\\webpack.${envType}.js --param=${project},${envType}`;

    return {
        nodeEnv,
        devEnv,
        cmd,
        project,
    };
}

program.
    command('run').
    alias('r').
    description('运行项目').
    option(
        '-O, --open',
        '启动web服务',
    ).
    option(
        '-P,--project <itemName>',
        '项目名称',
        'ktu',
    ).
    option(
        '-N,--node-env <itemName>',
        '部署环境变量',
        'dev',
    ).
    option(
        '-D,--dev-env <itemName>',
        '服务器环境变量',
        'dev',
    ).
    action((option, otherD, cmd) => {
        if (option.open) {
            console.log('启动web服务');
            runExpress({
                project: option.project,
            });
        }
    });

program.on(
    'command:*',
    operands => {
        console.error(`error: unknown command '${operands[0]}'`);
    },
);
program.on(
    '--help',
    operands => {
        console.log('');
        console.log('执行示例');
        console.log('');
        console.log('$ we run -O ');
    },
);

program.command('build').
    alias('b').
    description('构建生产环境').
    option(
        '-P, --project <itemName>',
        '项目名称',
        'ktu',
    ).
    option(
        '-N,--node-env <itemName>',
        '部署环境变量',
        'prod',
    ).
    option(
        '-D,--dev-env <itemName>',
        '服务器环境变量',
        'prod',
    ).
    action(option => {
        buildWebpack({
            project: option.project,
            nodeEnv: option.nodeEnv,
            devEnv: option.devEnv,
        });
    });

program.parse(process.argv);
