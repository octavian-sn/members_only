const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { isLoggedIn } = require('../middleware/authMiddleware');

// GET Profile
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('profile', { title: 'Profile'});
});

// POST Profile
router.post('/', async function (req, res, next) {
    try {
        const passcode = req.body.passcode;
        let membership_status = "user";
        
        const currentUser = req.user;

        if (passcode === 'Odinite') membership_status = 'member';
        if (passcode === 'Admin') membership_status = 'admin';

        await User.findByIdAndUpdate(currentUser._id, { membership_status });

        res.redirect("/");
    } catch (error) {
        console.error('Error updating membership_status:', error);
        res.status(500).send('Error updating membership_status');
    }
});

module.exports = router;