var express = require('express');
var router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET Register
router.get('/', function(req, res, next){
  res.render('register', {title: 'Register'});
})

// POST Register
router.post('/', [
  // Validate and sanitize fields.
  body("username")
    .trim()
    .isLength({ min: 1 }).withMessage("Username must be specified.")
    .isLength({ max: 20 }).withMessage("Username cannot be longer than 20 characters.")
    .escape()
    .isAlphanumeric().withMessage("Username contains non-alphanumeric characters.")
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
          throw new Error('Username already in use.');
      }
    }),
  body("first_name")
    .trim()
    .isLength({ min: 1 }).withMessage("First name must be specified.")
    .isLength({ max: 50 }).withMessage("First name cannot be longer than 15 characters.")
    .escape()
    .isAlphanumeric().withMessage("First name has non-alphanumeric characters."),
  body("last_name")
    .trim()
    .isLength({ min: 1 }).withMessage("Last name must be specified.")
    .isLength({ max: 50 }).withMessage("Last name cannot be longer than 15 characters.")
    .escape()
    .isAlphanumeric().withMessage("Last name has non-alphanumeric characters."),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Author object with escaped and trimmed data
    const user = new User({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      membership_status: "user",
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("register", {
        title: "Register",
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data form is valid, save the user in the DB.
      await user.save();
      // Redirect to homepage.
      res.redirect("/");
    }
  }),
])

module.exports = router;
