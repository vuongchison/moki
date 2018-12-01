var MongoDbConnection =  require('./MongoDbConnection');
var users = MongoDbConnection('users');
console.log(users);