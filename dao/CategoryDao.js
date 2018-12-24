
let categoriesCollection;

class CategoryDao {

	constructor() {
		categoriesCollection = null;
	}


	static getCollection(callback) {
		console.log("getCollection");
		var MongoDbConnection = require("../db/MongoDbConnection");
		// console.log("1");
		MongoDbConnection('categories', function (err, res) {
			if (err)
				throw err;

			categoriesCollection = res;
			// }
			callback()
		});
	}

	// static findOne(query, callback) {
	// 	categoriesCollection.findOne(query, function (err, res) {

	// 		if (res == null) {
	// 			res = {};
	// 		}
	// 		// console.log("res: " + res);
	// 		callback(err, res);
	// 	});
	// }

	// static findOne(query, projection, callback) {
	// 	categoriesCollection.findOne(query, projection, function (err, res) {

	// 		if (res == null) {
	// 			res = {};
	// 		}
	// 		// console.log("res: " + res);
	// 		callback(err, res);

	// 	});
	// }




	// static find(query, callback) {
	// 	categoriesCollection.find(query).toArray(function (err, res) {

	// 		if (res == null) {
	// 			res = [];
	// 		}
	// 		// console.log("res: " + res);
	// 		callback(err, res);

	// 	});
	// }

	static find(query, projection, callback) {
		categoriesCollection.find(query, projection).toArray(function (err, res) {

			if (res == null) {
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);

		});
	}

	static fineById(id, projection, callback){
		categoriesCollection.findOne({id: id}, {projection: projection}, function (err, res) {
					callback(err, res);
				});
	}

	static save(category, callback) {

		categoriesCollection.insertOne(category, function (err, res) {
			// console.log("1 document inserted");
			if (err) callback(err, false);
			else callback(null, true);
		});
	}

	


}

CategoryDao.getCollection(function(){
	console.log("CategoryDao");
});


module.exports = CategoryDao