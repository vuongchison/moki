function myclass(a){
    this.value = a;
}

myclass.prototype.s = function(){
    return this.value * this.value;
}

module.exports = myclass;