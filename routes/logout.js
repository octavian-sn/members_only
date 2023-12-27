var express = require('express');
var router = express.Router();

/* Logout */
router.get("/", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
