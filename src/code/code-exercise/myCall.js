Function.prototype.myCall = function (context) {
    const args = [...arguments].slice(1);
    context = context || window;
    // 此处的this是要改变this指向的函数本身，将这个函数作为context的一个属性，可以改变这个函数的this指向。
    context.fn = this;
    const res = context.fn(...args);
    delete context.fn;
    return res;
};
