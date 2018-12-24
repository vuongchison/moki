class Validate {
	static isEmpty(obj) {
		return obj == null || Object.keys(obj).length === 0 && obj.constructor === Object;
	}
	static checkParam(obj, params) {
		// console.log("Check: obj: " + obj + ", prams: " + params);
		for (var i = 0, len = params.length; i < len; i++) {
			if (!(params[i] in obj)) {
				console.log("false " + params[i]);
				return false;
			}
		}
		return true;
	}

	static checkPhonenumber(phonenumber) {
		const PhoneNumber = require("awesome-phonenumber");
		var pn = new PhoneNumber(phonenumber, 'VN');
		return (pn.isValid() && pn.isMobile());
	}

	static checkEmail(email) {
		const emailValidator = require("email-validator");

		return emailValidator.validate(email);
	}

	static checkPassword(password) {
		const passwordValidator = require('password-validator');
		var schema = new passwordValidator();
		schema
			.is().min(8)                                    // Minimum length 8
			.is().max(100)                                  // Maximum length 100
			.has().uppercase()                              // Must have uppercase letters
			.has().lowercase()                              // Must have lowercase letters
			.has().digits()                                 // Must have digits

		return schema.validate(password);
	}

}

module.exports = Validate;