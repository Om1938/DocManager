require('mongoose').model('User');

var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var secret = "PPPH";

module.exports = {
  createUsers: function (req, res) {
    var regn = req.body;
    console.log(regn);
    bcrypt.hash(regn.passWord, null, null, function (err, hash) {
      if (err) throw err;
      new User({ userName: regn.userName, passWord: hash })
        .save(function (err) {
          if (err) {
            if (err.code == 11000) {
              res.send({ success: false, message: "Duplicate Entry" });
            } else {
              res.status(504);
              res.send({ err: err });
            }
          } else {
            console.log('user saved');
            res.send();
          }
        });
    })
  },
  seeResults: function (req, res, next) {
    User.find({}, function (err, docs) {
      if (err) {
        throw err;
      } else {
        for (var i = 0; i < docs.length; i++) {
          console.log('user:', docs[i].userName);
        }
        res.end(JSON.stringify(docs));
      }
    });
  },
  login: function (req, res) {
    log = req.body;
    console.log(log);
    User.findOne({ userName: log.userName }, function (err, user) {
      if (err) throw err;
      if (user) {
        if (bcrypt.compareSync(log.passWord, user.passWord)) {
          var token = jwt.sign({ userName: user.userName }, secret, { expiresIn: '12h' });
          res.json({ sucess: true, token: token, message: "Login Successful" })
        } else {
          res.json({ sucess: false, message: "Login Failed" })
        }
      } else {
        res.json({ sucess: false, message: "Login Failed" })
      }
      //res.end(JSON.stringify(user));
    })
  },
  delete: function (req, res, next) {
    console.log(req.params.id);
    User.find({ _id: req.params.id }, function (err) {
      if (err) {
        req.status(504);
        req.end();
        console.log(err);
      }
    }).remove(function (err) {
      console.log(err);
      if (err) {
        res.end(err);
      } else {
        res.end();
      }
    });
  }
}