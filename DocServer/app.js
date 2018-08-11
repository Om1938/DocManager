var express = require('express');

const bodyParser = require('body-parser');
var app = express();
var db = require('./db');
var user = require('./user');
var jwt = require('jsonwebtoken');
var secret = "PPPH";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/login', user.login);
app.post('/users', user.createUsers);


app.use(function (req, res, next) {
  //console.log(req.headers);
  var token = req.body.token || req.body.query || req.headers['authorization'];
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {       
        err.status = 401;
        res.send({success:false ,code:401,message:"Token not Found"});
      } else {
        req.decoded = decoded;
        console.log(decoded.userName);
        next();
      }
    });
  } else {    
    res.send({success:false ,code:401,message:"Token not Found"});
  }
})
app.post('/getProf',user.getProfile);
app.delete('/users/:id', user.delete);

app.get('/', function (req, res) {
  res.send({message : "Tu gg Hai bhai!!"});
});
app.listen(3000, "0.0.0.0", function () {
  console.log('listening on port 3000!');
});
