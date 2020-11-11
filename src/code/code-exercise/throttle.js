function throttle(func, ms = 1000) {
    let timer;
    return function (...params) {
        if (timer) return;
        timer = setTimeout(() => {
            func.apply(this, params);
            timer = null;
        }, ms);
    };
}

export default throttle;
