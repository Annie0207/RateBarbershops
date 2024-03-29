//COMMENT ROUTE
const express = require("express");
//merge all request params
const router = express.Router({mergeParams: true});
const Barbershop = require("../models/barbershop");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const { isLoggedIn, checkUserComment, isAdmin } = middleware;

//Comment New
router.get("/new", isLoggedIn, function(req, res){
    //find barbershop by id, and then render the new form page
    Barbershop.findById(req.params.id, function(err, barbershop){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {barbershop: barbershop});
        }
    });
});

//Comment Create
router.post("/", isLoggedIn, function(req, res){
    Barbershop.findById(req.params.id, function(err, barbershop) {
        if(err){
            console.log(err);
            res.redirect("/barbershops");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    barbershop.comments.push(comment);
                    barbershop.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment！");
                    res.redirect('/barbershops/' + barbershop._id);
                }
            });
        }
    });
});

//Comment edit
router.get("/:comment_id/edit", isLoggedIn, checkUserComment, function(req, res){
   res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
});

//Comment update
router.put("/:comment_id", isAdmin, function(req, res){
	 Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
          console.log(err);
           res.render("edit");
       } else {
           res.redirect("/barbershops/" + req.params.id);
       }
   }); 
});


//Comment delete
router.delete("/:comment_id", isLoggedIn, checkUserComment, function(req, res){
    Barbershop.findByIdAndRemove(req.params.id, {
		$pull: {
			comments: req.comment.id
	    }
	}, function(err) {
		if(err){
			console.log(err);
		    req.flash('error', err.message);
            res.redirect('/');
	    } else {
		    req.comment.remove(function(err) {
				if(err) {
					req.flash('error', err.message);
				    return res.redirect('/');
			    }
			    req.flash('error', 'Comment deleted!');
			    res.redirect("/barbershops/" + req.params.id);
			});
		}
	});
});

module.exports = router;