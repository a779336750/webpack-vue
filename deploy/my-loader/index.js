function myLoader(source) {
    const tip = '这是我的loader';
    console.log(tip);
    console.log(source);
    return source;
};
module.exports = myLoader;
