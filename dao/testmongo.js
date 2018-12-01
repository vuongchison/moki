const mongo = require('mongodb');

// if (mongo != null)
// {
	console.log("OK");
	const url = 'mongodb://localhost:27017';
	mongo.connect(url,{ useNewUrlParser: true }, function(err, db) {
        console.log("connected");
        if (err) throw err;
	  
		var dbo = db.db("mydb");
	  
		if (dbo != null){
            console.log("dbo: " + dbo);
			  dbo.collection("users", function(err, res) {
				    if (err) throw err;
                    console.log(res);
                    res.insertOne({phonenumber: "0987654321", password: "1234abc"});
			  });
          }
        });