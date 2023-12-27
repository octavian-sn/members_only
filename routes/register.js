const express = require('express');
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
      return true;
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
  body("password")
    .isLength({ min: 10 }).withMessage("Password must contain at least 10 characters."),
  body("confirm_password")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match.");
        }
        return true;
    }),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    const { confirm_password, ...userData } = req.body;

    const errors = validationResult(req);

    // Check for errors and render the form again or save the user and redirect to Homepage
    if (!errors.isEmpty()) {
      res.render("register", {
        title: "Register",
        user:{
          ...userData,
          confirm_password
        },
        errors: errors.array(),
      });

      return;
    } else {
      try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
          ...userData,
          password: hashedPassword,
          membership_status: "user",
        });

        await user.save();
        
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect("/");
        });

      } catch(error) {

        res.render("error", { message: "An error occurred while saving the user.", error });

      }
    }
  }),
])

module.exports = router;
