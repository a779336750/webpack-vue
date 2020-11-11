
/* new做了哪些事情？
   创建一个对象，并返回
   将这个对象的原型设为函数的原型
   apply执行这个函数,将数据加到这个对象
   如果返回的是一个对象或者函数，则返回这个函数或对象，否则返回创建的对象 */
function myNew(Func, ...args) {
    const instance = {};
    if (Func.prototype) {
        Object.setPrototypeOf(instance, Func.prototype);
    }
    const res = Func.call(instance, args);
    if (typeof res === 'function' || (typeof res === 'object' && typeof res != null)) {
        return res;
    }
    return instance;
}

export default myNew;

