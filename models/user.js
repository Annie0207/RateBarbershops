var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//User model
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
	isAdmin: {type: Boolean, default: false}
});

//add the method into the user schema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);