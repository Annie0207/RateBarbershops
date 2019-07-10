var express        = require("express"),
    app            = express(),
    // for post
    bodyParser     = require("body-parser"), 
	mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
	cookieParser   = require("cookie-parser"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Barbershop     = require("./models/barbershop"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
	session = require("express-session"),
    seedDB         = require("./seeds");

//requireing Routes 
var commentRoutes       = require("./routes/comments"),
    barbershopRoutes   = require("./routes/barbershops"),
    indexRoutes         = require("./routes/index");

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/rate_barber");
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/rate_barber';

mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

//app.use():define middleware
app.use(bodyParser.urlencoded({extended: true}));
//之后的文件可省略ejs后缀
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
// seedDB(); //seed the databse

//Passport configuration
app.use(require("express-session")({
    secret: "this is my style!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//the prefix string will append before routes
app.use("/", indexRoutes);
app.use("/barbershops", barbershopRoutes);
app.use("/barbershops/:id/comments", commentRoutes);

// process.env.PORT
app.listen(3000, process.env.IP, function(){
    console.log("The RateBarber Server Has Started!");
});