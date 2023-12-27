const express = require('express');
const router = express.Router();
const passport = require("passport");

// GET Login
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login', message: '' });
});

router.post('/', function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        if (!user) {
            return res.render('login', {
                title: 'Login',
                message: 'Invalid username or password',
                username: req.body.username,
                password: req.body.password
            });
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

module.exports = router;
