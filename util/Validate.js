class Validate {
    static isEmpty(obj){
		return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
	}

}

module.exports = Validate;