/* bind做了哪些事情？
   获取bind的调用者，设为函数func
   将func函数接收到参数拼接到bind接受的参数上
   在func中调用apply
   返回func函数 */

Function.prototype.myBind = function (context) {
    const fn = this;
    const args = Array.from(arguments).slice(1);
    const newFunc = function () {
        // 兼容new
        if (this instanceof newFunc) {
            fn.apply(this, args.concat(...arguments));
        } else {
            fn.apply(context, args.concat(...arguments));
        }
    };
    // 指向原来的原型链，防止原型被篡改
    Object.prototype = Object.create(fn.prototype);
    return newFunc;
};
