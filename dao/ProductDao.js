
let productsCollection;

class ProductDao {

	constructor() {
		productsCollection = null;
	}


	static getCollection(callback) {
		console.log("getCollection");
		var MongoDbConnection = require("../db/MongoDbConnection");
		// console.log("1");
		MongoDbConnection('products', function (err, res) {
			if (err)
				throw err;

			productsCollection = res;
			// }
			callback()
		});
	}

	static findOne(query, callback) {
		productsCollection.findOne(query, function (err, res) {

			if (res == null) {
				res = {};
			}
			// console.log("res: " + res);
			callback(err, res);
		});
	}

	// static findOne(query, projection, callback) {
	// 	productsCollection.findOne(query, projection, function (err, res) {

	// 		if (res == null) {
	// 			res = {};
	// 		}
	// 		// console.log("res: " + res);
	// 		callback(err, res);

	// 	});
	// }


	static find(query, projection, callback) {
		console.log("query: " + JSON.stringify(query) + ", projection: " + projection);
		productsCollection.find(query, {projection: projection}).toArray(function (err, res) {

			if (res == null) {
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);

		});
	}

	// static find(query, callback) {
	// 	productsCollection.find(query).toArray(function (err, res) {

	// 		if (res == null) {
	// 			res = [];
	// 		}
	// 		// console.log("res: " + res);
	// 		callback(err, res);

	// 	});
	// }



	static save(product, callback) {

		productsCollection.insertOne(product, function (err, res) {
			// console.log("1 document inserted");
			if (err) callback(err, false);
			else callback(null, true);
		});
	}




}

ProductDao.getCollection(function () {
	console.log("ProductDao");
});


module.exports = ProductDao