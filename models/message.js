const mongoose = require('mongoose');
const {DateTime} = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxLength: 150},
    text: { type: String},
    date: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref:"User"},
})

// Virtual for formatted date (dd.mm.yyyy)
MessageSchema.virtual('formattedDate').get(function () {
    return DateTime.fromJSDate(this.date).toFormat('dd.LL.yyyy');
});

// Virtual for formatted time (hh:mm)
MessageSchema.virtual('formattedTime').get(function () {
    return DateTime.fromJSDate(this.date).toFormat('HH:mm');
});

module.exports = mongoose.model("Message", MessageSchema);