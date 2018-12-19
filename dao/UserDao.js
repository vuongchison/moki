// import MongoDbConnection from "../db/MongoDbConnection.js";
let usersCollection;
console.log("Initing UserDao");
const Validate = require('../util/Validate');
const jwt = require('../util/jwt-module');

class UserDao {

	constructor(){
		usersCollection = null;
	}


	static getCollection(callback){
		console.log("getCollection");
		var MongoDbConnection = require("../db/MongoDbConnection");
		// console.log("1");
		MongoDbConnection('users', function(err, res){
			if (err)
				throw err;
		
				usersCollection = res;
		// }
			callback()
		});
		
	}

	static get usersCollection(){
		return usersCollection;
	}

	static findOne(query, callback){
		// console.log("usersCollection: " + this.usersCollection);
	
		usersCollection.findOne(query, function(err, res){
			
			if (res == null)
			{
				res = {};
			}
			// console.log("res: " + res);
			callback(err, res);
		});
	}

	static findOne(query, projection, callback) {
		usersCollection.findOne(query, projection, function(err, res){
			
			if (res == null)
			{
				res = {};
			}
			// console.log("res: " + res);
			callback(err, res);
		
		});
	}

	static findByPhonenumber(phonenumber, projection, callback){
		usersCollection.findOne({phonenumber: phonenumber}, projection, function(err, res){
			if (err || res == null || res == {}){
				callback(err, {});
			}
			else{
				callback(null, res);
			}
		});
	}


	static save(user, callback) {
		
			usersCollection.insertOne(user, function(err, res) {
				// console.log("1 document inserted");
				if (err) callback(err, false);
				else callback(null, true);
				});
	}
	

	

	static find(query, callback) {
		usersCollection.find(query).toArray( function(err, res){
			
			if (res == null)
			{
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);
		
		});
	}

	static find(query, projection, callback) {
		usersCollection.find(query, projection).toArray( function(err, res){
			
			if (res == null)
			{
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);
		
		});
	}
	

	static checkLoginByUsername(username, password, callback) {
		usersCollection.findOne({ username: username, password: password }, { id: 1, username: 1, avatar: 1 }, function (err, res) {
			if (err || res == null){
				callback(err, false);
				return false;
			}
			else {
				callback(null, true);
				return true;
			}

		});
	}

	static checkLoginByPhonenumber(phonenumber, password, callback) {
		usersCollection.findOne({ phonenumber: phonenumber, password: password }, { id: 1, username: 1, avatar: 1 }, function (err, res) {
			if (err || res == null){
				callback(err, false);
				return false;
			}
			else {
				callback(null, true);
				return true;
			}

		});
	}

	static checkLoginByEmail(email, password, callback) {
		usersCollection.findOne({ email: email, password: password }, { id: 1, username: 1, avatar: 1 }, function (err, res) {
			if (err || res == null){
				callback(err, false);
				return false;
			}
			else {
				callback(null, true);
				return true;
			}

		});
	}

	static checkToken(token) {
		var res = jwt.verify(token);
		return res;
	}

	static getToken(phonenumber, password){
		var token = jwt.sign({phonenumber: phonenumber, password: password});
		return token;
	}

	static createVerifyCode(phonenumber, code, callback){
		usersCollection.findOneAndUpdate({phonenumber: phonenumber}, {$set: {VerifyCode: code, CreateCodeTime: Date.now()}}, function(err, res){
			if (err || Validate.isEmpty(res))
			{
				callback(err, false);
			}
			else{
				callback(null, true);
			}
		});
	}

	static checkVerifyCode(phonenumber, code, callback){
		usersCollection.findOne({phonenumber: phonenumber, VerifyCode: code}, { CreateCodeTime: 1}, function(err, res){
			if (err || Validate.isEmpty(res)){
				callback(err, false);
			}
			else{
				if ((res.CreateCodeTime - Date.now()) / 1000 <= 60*5 ){
					callback(null, true);
				}
				else{
					callback(null, false);
				}
			}
		});
	}

	static updateByPhonenumber(phonenumber, values, callback){
		usersCollection.findOneAndUpdate({phonenumber: phonenumber}, {$set: values}, function(err, res){
			if (err || Validate.isEmpty(res))
			{
				callback(err, false);
			}
			else{
				callback(null, true);
			}
		});
	}
	
}

UserDao.getCollection(function(){
	console.log("UserDao");
});


module.exports = UserDao



// export default class {UserDao};



// import MongoDbConnection from "../db/MongoDbConnection.js";



// async function UserDao(){

	

	
// 	// var mgc = new MongoDbConnection("user");
	 
// 	var MongoDbConnection = require("../db/MongoDbConnection");
// 	console.log("1");
// 	await MongoDbConnection("user", function(err, res){
// 		console.log("2");
// 		if (err) throw err;
// 		this.usersCollection = res;
// 	});
// 	console.log("3");
	

// 	this.findOne = function(query){
// 		console.log("usersCollection: " + this.usersCollection);
// 		this.usersCollection.findOne(query, function(err, result){
// 			if (err) throw err;
// 			return result;
// 		});
// 	}

// 	this.save = function(user){
// 		if (this.findOne({phonenumber: user['phonenumber']}) == null){
// 			this.usersCollection.insertOne(user, function(err, res) {
// 				if (err)
// 				{
// 					throw err;
// 					return false;
// 				}
// 				console.log("1 document inserted");
// 				});
// 				return true;
// 			}
// 		return false;
// 	}

// }

// UserDao.prototype.save = function(user){
// 	if (findOne({phonenumber: user['phonenumber']}) == null){
// 		this.usersCollection.insertOne(user, function(err, res) {
// 			if (err)
// 			{
// 				throw err;
// 				return false;
// 			}
// 			console.log("1 document inserted");
// 			});
// 			return true;
// 		}
// 	return false;
// }

// UserDao.prototype.findOne = function(query){
// 	this.usersCollection.findOne(query, function(err, result){
// 		if (err) throw err;
// 		return result;
// 	});
// }

// module.exports = UserDao;