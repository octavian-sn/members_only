const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 15},
    last_name: { type: String, required: true, maxLength: 15},
    username: { type: String, required: true, maxLength: 20},
    password: { type: String, required: true, maxLength: 30},
    membership_status: { type: String, maxLength: 15},
});

UserSchema.virtual("name").get(function(){
    let fullName = "";
    if(this.first_name && this.last_name){
        fullName = `${this.first_name} ${this.last_name}`;
    }
    return fullName;
});

module.exports = mongoose.model("User", UserSchema);