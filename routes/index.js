//AUTH ROUTES
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

//show regiseter form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to RateBarber " + user.username);
           res.redirect("/barbershops"); 
        });
    });
});

//show login form(middleware)
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

//handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/barbershops",
        failureRedirect:"/login",
	    failureFlash: true,
        successFlash: 'Welcome to RateBarber!'
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/barbershops");
});

module.exports = router;