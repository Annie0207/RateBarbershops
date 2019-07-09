var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//User model
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//add the method into the user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);