// class MongoDbConnection {
	
// 	// dbo;
// 	constructor(){
// 		const mongo = require('mongodb').MongoClient;
// 		const url = 'mongodb://localhost:27017/';
// 		const dbname = "mydb";
		
// 			// console.log("OK");
// 			mongo.connect(url,{ useNewUrlParser: true }, function(err, db) {
// 				if (err) throw err;
// 				this.dbo = db.db(dbname);
// 			});
		
// 	}
			
// }

// // module.exports = MongoDbConnection

// export default class {MongoDbConnection};



function MongoDbConnection(collectionName, callback){
	console.log("MOngodbconnection, collectionname: " + collectionName);
	const mongo = require('mongodb');

	const url = 'mongodb://localhost:27017';
	mongo.connect(url,{ useNewUrlParser: true }, function(err, db) {
		if (err) console.log("db err");
		var dbo = db.db("mydb");
		if (dbo != null){
			var col = dbo.collection(collectionName);
			callback(err, col);
			// console.log("collection: " + col);
			//   dbo.collection(collectionName, function(err, res) {
			// 		if (err) throw err;
			// 		callback(err, res);
				
			//   });
          }
		});	
}


// MongoDbConnection('users', function(err, res){
// 	if (err)
// 		throw err;
// 	console.log(res);
// });

module.exports = MongoDbConnection;