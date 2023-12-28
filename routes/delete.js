const express = require('express');
const router = express.Router();
const Message = require("../models/message");

router.post('/:id', async function (req, res, next) {
    try {
        await Message.findByIdAndDelete(req.params.id);

        res.redirect('/');
    } catch(error){
        res.render("error", { message: "An error occurred while deleting the message.", error });
    }
});

module.exports = router;