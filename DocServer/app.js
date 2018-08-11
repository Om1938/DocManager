var express = require('express');

const bodyParser= require('body-parser');
var app = express();
var db = require('./db');
var user = require('./user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.post('/users', user.createUsers);
app.post('/login', user.login);
app.delete('/users/:id', user.delete);

app.get('/',function(req,res){
  res.end("Tu gg Hai bhai!!");
});
app.listen(3000,"0.0.0.0", function () {
  console.log('listening on port 3000!');
});
