const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/message");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const messages = (await Message.find().populate("user")).reverse();

  res.render('index', { title: 'Message Board', messages});
});

router.post('/', [
  body("title")
    .trim()
    .isLength({ min: 1 }).withMessage("Title is required.")
    .isLength({ max: 150 }).withMessage("Title cannot be longer than 150 characters."),
  body("message")
    .trim(),

  asyncHandler(async (req, res, next)=> {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      const messages = (await Message.find().populate("user")).reverse();
      res.render('index', {
        title: 'Message Board',
        message: req.body.message,
        message_title: req.body.title,
        errors: errors.array(),
        messages
      })
      return;
    } else {
      try {
        const message = new Message({
          title: req.body.title,
          text: req.body.message,
          user: res.locals.currentUser._id
        })
        await message.save();

        res.redirect("/");
      } catch(error) {

        res.render("error", { message: "An error occurred while saving the message.", error });

      }
    }
  })
])

module.exports = router;
