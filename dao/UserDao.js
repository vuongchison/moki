// import MongoDbConnection from "../db/MongoDbConnection.js";
let usersCollection;
console.log("Initing UserDao");
const Validate = require('../util/Validate');

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

	static save(user, callback) {
		
			usersCollection.insertOne(user, function(err, res) {
				// console.log("1 document inserted");
				callback(err, res);
				});
	}
	

	

	static find(query, callback) {
		usersCollection.find(query).toArray( function(err, result){
			
			if (res == null)
			{
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);
		
		});
	}

	static find(query, projection, callback) {
		usersCollection.find(query, projection).toArray( function(err, result){
			
			if (res == null)
			{
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);
		
		});
	}
	
	// static login(phonenumber, password){
	// 	usersCollection.findOne({phonenumber: phonenumber, password: password}, function(err, res){
	// 		if(err || Validate.isEmpty(res))
	// 			return null;
	// 		else 
	// 			return {id: res.id, username: res.username, avatar: res.avatar};

	// 	});
	// }

	// static updateOne(filter, update, options) {
		
	// }
	
	// static delete(id) {
		
	// }
	
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