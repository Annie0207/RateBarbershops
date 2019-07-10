var express = require("express");
var router = express.Router();
var Barbershop = require("../models/barbershop");
var Comment = require("../models/comment");
//require default include the index.js file
var middleware = require("../middleware");
var geocoder = require('geocoder');
var { isLoggedIn, checkUserBarbershop, checkUserComment, isAdmin } = middleware; 

//INDEX ROUTE -- show all barbershops
router.get("/", function(req, res){
        Barbershop.find({}, function(err, allBarbershops){
            if(err){
                console.log(err);
            } else {
                res.render("barbershops/index", {barbershops:allBarbershops, currentUser: req.user});
            }
        });
});

//NEW ROUTE -- show form to create new barbershop
router.get("/new", isLoggedIn, function(req, res) {
    res.render("barbershops/new");
});

// CREATE ROUTE -- add new barbershop to DB
// same url with different methods is identified as different routes: the post route will get the sumbit form
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || data.status === 'ZERO_RESULTS') {
		  req.flash('error', 'Invalid address');
		  return res.redirect('back');
    	}
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newBarbershop = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};

		Barbershop.create(newBarbershop, function(err, newlyCreated) {
			if(err){
				console.log(err);
			} else {
				console.log(newlyCreated);
				//default to get method url
				res.redirect("/barbershops");
			}
		});
    });
});

//SHOW ROUTE -- show more info about a barbershop with provided id
router.get("/:id", function(req, res){
    Barbershop.findById(req.params.id).populate("comments").exec(function(err, foundBarbershop){
        if(err || !foundbarBershop){
			console.log(err);
			req.flash("error", "Sorry, that barbershop does not exist!");
			res.redirect("back");
        } else{
            res.render("barbershops/show", {barbershop: foundBarbershop});
        }
    });
});

//EDIT barbershop ROUTE
router.get("/:id/edit", isLoggedIn, checkUserBarbershop, function(req, res) {
  res.render("barbershops/edit", {barbershop: req.barbershop});
});

//UPDATE barbershop ROUTE
router.put("/:id", function(req, res){
	geocoder.geocode(req.body.location, function (err, data) {
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
		Barbershop.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedBarbershop){
			if(err){
				req.flash("error", err.message);
				res.redirect("/barbershops");
			} else {
				req.flash("success","Successfully Updated!");
				res.redirect("/barbershops/" + updatedBarbershop._id);
			}
		});
    });
});

//DESTROY barbershop and its comments ROUTE
router.delete("/:id", isLoggedIn, checkUserBarbershop, function(req, res){
	Comment.remove({
		_id: {
			$in: req.barbershop.comments
		}
	}, function(err) {
		if(err) {
			req.flash('error', err.message);
            res.redirect('/');
        } else {
			req.barbershop.remove(function(err) {
				if(err) {
                	req.flash('error', err.message);
                	return res.redirect('/');
            	}
            req.flash('error', 'Barbershop deleted!');
            res.redirect('/barbershops');
			});
		}
	});
});

module.exports = router;