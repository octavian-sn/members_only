var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Message = require("../models/message");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Message Board' });
});

// Sign-up page
router.get('/register', function(req, res, next){
  res.render('register', {title: 'Register'});
})

router.post('/register', function(req, res, next){
  res.render('register', {title: 'Register'});
})

module.exports = router;
