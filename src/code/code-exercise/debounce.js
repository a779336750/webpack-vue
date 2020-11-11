function debounce(func, ms = 1000) {
    let timer;
    return function (...params) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, params);
        }, ms);
    };
}

export default debounce;

