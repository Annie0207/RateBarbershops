var mongoose = require("mongoose");
var barbershop = require("./models/barbershop");
var Comment = require("./models/comment");

var data = [
    {
        name: "Corbett", 
        image: "https://scontent-sjc3-1.cdninstagram.com/vp/bce5b05e622b48c984a109000831a5ff/5DAF0490/t51.2885-15/e35/46795368_655721048192949_5756792507916615680_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
        description: "Who says pink can't look grown-up and sophisticated?  I guarantee this mesmerizing shade will keep everyone guessing if your hair is pink, red, or brown? This shade is for those who love pink but want something cooler and understated. It's a combination of bright cherry red with a hint of pink."
    },
    {
        name: "Brown", 
        image: "https://scontent-sjc3-1.cdninstagram.com/vp/96771b2a474333e5485270e02adc359b/5DA9B304/t51.2885-15/e35/42003896_1432329206900858_9219057304119279616_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
        description: "A nice departure from platinum or honey blonde is what we're calling creamy blonde. I love it and recommend it because creamy blonde will have a moment this spring because platinum can be too harsh for many skin tones. This shade's neutral and golden tones work on all skin tones, giving the wearer a fresh and youthful look."
    },
    {
        name: "Coco", 
        image: "https://scontent-sjc3-1.cdninstagram.com/vp/e7561e73a93f8c03ee79793879753f86/5DB51293/t51.2885-15/e35/47146942_2760383284185858_8506558244522674409_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com",
        description: "Pantone dubbed coral the color of the year for 2019, describing it as 'an animating and life-affirming coral hue with a golden undertone.' I really like this shade for the bold-hearted, though it will look fab on anyone who tries it. It's a natural progression from the orange hair trend we’ve been seeing. The golden undertone enhances my eye color—blues and greens pop, while browns look warmer—and softens skin tones."
    }
];


// delete all database when starting server
function seedDB(){
   //Remove all barbershops
   Barbershop.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed barbershops!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            
             //add a few barbershops
            data.forEach(function(seed){
                Barbershop.create(seed, function(err, barbershop){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a barbershop");
                        //create a comment and associate the comment with barbershop
                        Comment.create(
                            {
                                text: "This barbershop seems great, but the hairstyle is not fit for me",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    barbershop.comments.push(comment);
                                    barbershop.save();
                                    console.log("Created a new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
}

module.exports = seedDB;