// var splitRegex = /[+-, ?.;'\"\s()]+/
// var x = "vuong+chi\nson\t\t dep trai, ngay tho,trong.sang?lanh manh"	
// var X = x.split(splitRegex)
// console.log(X)

// var a = 'Vương Chí Sơn'; // with accents, lowercase
// var b = 'vuong chi son'; // no accents, uppercase

// console.log(a.localeCompare(b));
// // expected output: 1
// console.log(a.localeCompare(b, 'vn', {sensitivity: 'base'}));
// // expected output: 0

// var Compare = require("./util/Compare");
// const splitRegex = /[+-, ?.;'\"\s()]+/;
// console.log(Compare(" son trai dep  ".toLocaleUpperCase().toString().split(splitRegex), "vuong chi son dep trai dep trai dep trai dep trai dep trai".toLocaleUpperCase().toString().split(splitRegex)));

// var Filter = require('./util/Filter');
// var raw = {a1: 1, a2: 2, a3: 3, a4: 4}
// console.log(Filter(raw, ['a1', 'a2', 'a9'], ['a4', 'a1', 'a10']))

// var raw = {a1: "a1", a2: 'a2', a3: 'a3', a4: 'a4'};
// var rawstring = (raw.a1 || '') + ' ' + (raw.a2 || '') + ' ' + (raw.a6 || '') + ' ' + (raw.a3 || '');
// console.log(rawstring);

// var a= [1, 2, 3];
// console.log(a);

// var a = {a1: "a1", a2: 'a2', a3: 'a3', a4: 'a4'};
// var b = {b1: "a1", b2: 'a2'};

// console.log({...a, ...b});

var ProductDao = require('./dao/ProductDao');

var myfunct = function (){ 
  console.log("run search");
  var t = Date.now();
  ProductDao.search('sữa Physiolac trẻ em phát triển chiều cao, tránh táo bón', {}, {id: 1}, function(err, res){
  // console.log(res);
  
  console.log("len: " + res.length);
  console.log("time: " + (Date.now() - t)/1000 + "s");
  process.exit();

});
}

setTimeout(myfunct, 3000);



// var map = {}

// if (! ('SƠN' in map))
//   map['SƠN'] = []
//  map['SƠN'].push(1)
// console.log(map['SƠN'])

