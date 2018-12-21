var app = require('express')();
var bodyParser = require('body-parser');
// var multer = require('multer'); 
// var upload = multer(); // for parsing multipart/form-data
var http = require('http');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/profile',  function (req, res) {
  console.log(req.body);
  res.json(req.body);
});



http.createServer(app).listen(80);
