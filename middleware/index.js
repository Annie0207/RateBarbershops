var Barbershop = require("../models/barbershop");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

//middleware for check login
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

//middleware for authorization 
middlewareObj.checkBarbershopOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Barbershop.findById(req.params.id, function(err, foundBarbershop){
            if(err || !foundbarbershop){
                req.flash("error", "Sorry, that barbershop does not exist!");
                res.redirect("back");
            } else {
                //check if user own the barbershop
                if(foundBarbershop.author.id.equals(req.user._id)){
					req.barbershop = foundBarbershop;
                    next();
                } else {
                     req.flash("error", "You don't have permission to do that!");
                    res.redirect("/barbershops/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};


//middleware for authorization
middlewareObj.checkCommentOwnership =  function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Sorry, that comment does not exist!");
                res.redirect("back");
            } else {
                //check if user own the comment
                if(foundComment.author.id.equals(req.user._id)){
					req.comment = foundComment;
                    next();
                } else {
                     req.flash("error", "You don't have permission to do that!");
                    res.redirect("/barbershops/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};



module.exports = middlewareObj;