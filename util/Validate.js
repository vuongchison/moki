class Validate {
    static isEmpty(obj){
		return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
	}
	static checkParam(obj, params) {
		console.log("Check: obj: " + obj + ", prams: " + params);
		for (var i = 0, len = params.length; i < len ; i++) {
			if (!(params[i] in obj))
			{
				console.log("false " + params[i]);
				return false;
			}
		}
		return true;
	}
	

}

module.exports = Validate;