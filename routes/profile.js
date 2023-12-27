const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/authMiddleware');

// GET Login
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('index', { title: 'Profile', user: req.user });
});

module.exports = router;