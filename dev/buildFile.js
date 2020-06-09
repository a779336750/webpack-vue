/**
 * node实现文件复制，将dist目录下的文件复制到build目录下
 */

const path = require('path');
const fs = require('fs');

//将相对路径转换成绝对路径
const buildPath = path.resolve(__dirname, '../build');
const distPath = path.resolve(__dirname, '../dist');

fs.readdir(distPath, (err, files) => {
    readAndCopyDir(distPath, buildPath);
})

async function readAndCopyDir(originPath, targetPath) {
    const dirName = originPath.split('\\')[originPath.split('\\').length - 1];
    if (!RegExp(`${dirName}$`).test(targetPath)) {
        //将给定的path连接起来
        targetPath = path.join(targetPath, dirName);
    }
    mkdir(targetPath);

    // 读取目录的内容。 回调有两个参数 (err, files)
    fs.readdir(originPath,  (err, files) => {
        cleanFile(targetPath);
        files.forEach(file => {
            copyFile(file, originPath, targetPath);
        })
    })
}

function copyFile(fileName, originPath, targetPath) {
    const filePath = path.resolve(originPath, fileName);
    fs.stat(filePath, (err, stat) => {
        if (!err) {
            if (stat.isFile()) {
                fs.createReadStream(filePath)
                    .pipe(fs.createWriteStream(path.resolve(targetPath, fileName)));
            } else {
                readAndCopyDir(path.resolve(originPath, fileName), targetPath);
            }
        }
    })
}

function cleanFile(path) {
    deleteFiles(path);
    mkdir(path);
}

function deleteFiles(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFiles(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

function mkdir(targetPath) {
    //判断给定的路径是否存在
    if (fs.existsSync(targetPath)) {
    } else {
        // 同步地创建目录
        fs.mkdirSync(targetPath, (err) => {
        });
    }
}

