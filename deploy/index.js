var request = require('request');
console.log('deploying........');
request('https://www.baidu.com/', function(err, response, body) {
    //err 当前接口请求错误信息
    //response 一般使用statusCode来获取接口的http的执行状态
    //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据
    //需要通过JSON.parse(body)来转换
    if(!err && response.statusCode == 200) {
        console.log('ok');
    }
});
