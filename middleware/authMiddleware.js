const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = { isLoggedIn };
