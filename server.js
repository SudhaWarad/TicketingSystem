
// Dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var clientDir = express.static(path.join(__dirname, 'views'));

//console.log(clientDir);

// MongoDB
mongoose.connect('mongodb://localhost/rest_ticket');

// Express
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});


app.get('/TicketLogs.html',function(req,res){
	res.sendfile('./views/TicketLogs.html');
});

app.get('/TicketLogs.css',function(req,res){
	res.sendfile('./views/TicketLogs.css');
});
app.get('/TicketLogs.js',function(req,res){
	res.sendfile('./views/TicketLogs.js');
});


app.get('/', function(req, res) {
	res.sendfile('./views/Login.html')
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Start server
//app.listen(3000);
app.listen(process.env.PORT);
console.log('API is running on port 3000');
