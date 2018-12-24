var fs = require('fs');
// to sign JWT
var privateKEY 	= fs.readFileSync(__dirname+'/p.key', 'utf8'); 
// var publicKEY 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT

module.exports = function(){
   
    console.log(__dirname);
    console.log(__filename);
    var Random = require('../util/RandomCode');
    console.log(Random());
    console.log(privateKEY);
}