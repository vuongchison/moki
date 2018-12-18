let loginCollection;
console.log("Initing loginDao");
// const Validate = require('../util/Validate');
const fs = require('fs');

const jwt = require('../util/jwt-module');



class LoginDao {

	constructor() {
		loginCollection = null;
	}


	static getCollection(callback) {
		console.log("getCollection");
		var MongoDbConnection = require("../db/MongoDbConnection");
		// console.log("1");
		MongoDbConnection('login', function (err, res) {
			if (err)
				throw err;

			loginCollection = res;
			// }
			callback()
		});

	}



	static checkLoginByUsername(username, password, callback) {
		loginCollection.findOne({ username: username, password: password }, { id: 1, username: 1, avatar: 1 }, function (err, res) {
			if (err || res == null)
				callback(err, false);
			else {
				callback(null, true);
			}

		});
	}

	static checkLoginByPhonenumber(phonenumber, password, callback) {
		loginCollection.findOne({ phonenumber: phonenumber, password: password }, { id: 1, username: 1, avatar: 1 }, function (err, res) {
			if (err || res == null)
				callback(err, false);
			else {
				callback(null, true);
			}

		});
	}

	static checkToken(token, callback) {
		var res = jwt.verify(token);
		callback(res);
	}

	static getToken(username, password){
		var token = jwt.sign({username: username, password: password});
		callback(res);
	}


	static signup(username, password, callback){
		loginCollection.insertOne({username: username, password: password});
	}

}

LoginDao.getCollection(function () {
	console.log("LoginDao");
});


module.exports = LoginDao;