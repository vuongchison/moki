module.exports = function(){
    const start = 100000, end = 999999;
    var code = Math.floor(Math.random() * (1 + end - start)) + start;
    return code;
}