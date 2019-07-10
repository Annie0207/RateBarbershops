var Barbershop = require("../models/barbershop");
var Comment = require("../models/comment");

// all the middleware goes here
module.exports = {
  //middleware for check login
  isLoggedIn: function(req, res, next){
      if(req.isAuthenticated()){
          return next();
      }
      req.flash('error', 'You must be signed in to do that!');
      res.redirect('/login');
  },
  //middleware for authorization
  checkUserBarbershop: function(req, res, next){
    barbershop.findById(req.params.id, function(err, foundBarbershop){
      if(err || !foundBarbershop){
          console.log(err);
          req.flash('error', 'Sorry, that barbershop does not exist!');
          res.redirect('/barbershops');
      } else if(foundbarbershop.author.id.equals(req.user._id) || req.user.isAdmin){
          req.barbershop = foundbarbershop;
          next();
      } else {
          req.flash('error', 'You don\'t have permission to do that!');
          res.redirect('/barbershops/' + req.params.id);
      }
    });
  },
  //middleware for authorization
  checkUserComment: function(req, res, next){
    Comment.findById(req.params.commentId, function(err, foundComment){
       if(err || !foundComment){
           console.log(err);
           req.flash('error', 'Sorry, that comment does not exist!');
           res.redirect('/barbershops');
       } else if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
            req.comment = foundComment;
            next();
       } else {
           req.flash('error', 'You don\'t have permission to do that!');
           res.redirect('/barbershops/' + req.params.id);
       }
    });
  },
  isAdmin: function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  }
};