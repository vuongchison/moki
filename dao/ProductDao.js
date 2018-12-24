const Compare = require('../util/Compare');
const Validate = require('../util/Validate');
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
		// console.log("query: " + JSON.stringify(query) + ", projection: " + projection);
		productsCollection.find(query, { projection: projection }).toArray(function (err, res) {

			if (res == null) {
				res = [];
			}
			// console.log("res: " + res);
			callback(err, res);

		});
	}

	static findById(id, projection, callback) {
		productsCollection.findOne({ id: id }, { projection: projection }, function (err, res) {
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


	static updateById(id, values = {}, callback) {
		productsCollection.findOneAndUpdate({ id: id }, { $set: values }, function (err, res) {
			if (err || Validate.isEmpty(res)) {
				callback(err, false);
			}
			else {
				callback(null, res);
			}
		});
	}

	static deleteById(id, callback) {
		productsCollection.deleteOne({ id: id }, function (err, res) {
			if (err) {
				callback(err, false);
			} else {
				callback(null, true);
			}
		})
	}

	// static s(keyword, query, projection, limit, skip, searchresult, callback) {
	// 	console.log(skip + "-" + (limit + skip));

	// 	var cursor = productsCollection.find(query, { projection: projection, limit: limit, skip: skip });
	// 	if (cursor == null) {
	// 		callback(null, true);
	// 	}
	// 	cursor.forEach(function (item) {
	// 		if (item === null) {
	// 			// searchresult.sort((a, b) => {
	// 			// 	var match = -a['match_percent'] + b['match_percent'];
	// 			// 	var lcs = -a['LCS'] + b['LCS'];
	// 			// 	var distance = a['edit_distance'] - b['edit_distance'];

	// 			// 	return match != 0 ? match : (lcs != 0 ? lcs : (distance));
	// 			// });
	// 			// // callback(err, searchresult); // All done!
	// 			// this.s(keyword, query, projection, limit, skip + limit, searchresult, callback);
	// 		}

	// 		var docString = (item['name'] || '') + ' ' + (item['described'] || '') + ' ' + (item['brand']['brand_name'] || '') + ' ' + (item['seller']['name'] || '');
	// 		var res = Compare(keyword, docString);


	// 		if (res['match_percent'] > 80) {
	// 			// console.log(res);
	// 			searchresult.push({ ...item, ...res });
	// 		}

	// 	}, function (err) {
	// 		console.log(err);
	// 		searchresult.sort((a, b) => {
	// 			var match = -a['match_percent'] + b['match_percent'];
	// 			var lcs = -a['LCS'] + b['LCS'];
	// 			var distance = a['edit_distance'] - b['edit_distance'];

	// 			return match != 0 ? match : (lcs != 0 ? lcs : (distance));
	// 		});
	// 		// callback(err, searchresult); // All done!
	// 		this.constructor.s(keyword, query, projection, limit, skip + limit, searchresult, callback);
	// 		// callback(err, true);
	// 	});

	// }

	static search(keyword, query, projection, callback) {

		var searchresult = [];
		projection['brand'] = 1;
		projection['seller'] = 1;
		projection['name'] = 1;
		projection['described'] = 1;

		var splitRegex = /[+-, ?.;'\"\s()]+/;
		var X = keyword.toLocaleUpperCase().trim().split(splitRegex);
	

		var s = function (limit, skip) {
			// console.log(skip + "-" + (limit + skip));
		
			productsCollection.find(query, { projection: projection, limit: limit, skip: skip }).toArray(function (err, res) {
				// console.log('loaded: ' + res.length);
				if (err || Validate.isEmpty(res) || res.length == 0) {
					searchresult.sort((a, b) => {
						var match = -a['match_percent'] + b['match_percent'];
						var lcs = -a['LCS'] + b['LCS'];
						var distance = a['edit_distance'] - b['edit_distance'];

						return match != 0 ? match : (lcs != 0 ? lcs : (distance));
					});

					callback(err, searchresult);

				}
				s(limit, skip + limit);
				
				for (var i = 0, l = res.length; i < l; i++) {
					// var item = res[i];
					// console.log(res[i]);
					var docString = (res[i]['name'] || '') + ' ' + (res[i]['described'] || '') + ' ' + (res[i]['brand']['brand_name'] || '') + ' ' + (res[i]['seller']['name'] || '');
					var cmpres = Compare(X, docString.toLocaleUpperCase().trim().split(splitRegex));


					if (cmpres['match_percent'] > 80) {
						// console.log(res);
						searchresult.push({ ...res[i], ...cmpres });
					}
				}	
				// console.log("done: " + skip);
				
			});
		}

		s(3000, 0);
		
	}


}

ProductDao.getCollection(function () {
	console.log("ProductDao");
});


module.exports = ProductDao