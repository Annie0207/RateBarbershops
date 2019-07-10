# RateBarbershops

###Initial Setup

* Add Landing Page
* Add Barbershops Page that lists all barbershops

###Each Barbershop has:

* Name
* Image

###Layout and Basic Styling

* Create our header and footer partials
* Add in Bootstrap

###Creating New Barbershops

* Setup new barbershop POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

###Style the barbershops page

* Add a better header/title
* Make barbershops display in a grid

###Style the Navbar and Form

* Add a navbar to all templates
* Style the new barbershopform

###Add Mongoose

* Install and configure Mongoose
* Setup barbershop model
* Use barbershop model inside of our routes

###Show Page

* Add description to our barbershop model
* Show db.collection.drop()
* Add a show route/template

###Refactor Mongoose Code

* Create a models directory
* Use module.exports

###Add Seeds File

* Add a seeds.js file
* Run the seeds file every time the server starts

###Add the Comment model!

* Display comments on barbershops show page

###Comment New/Create

* Add the comment new and create routes
* Add the new comment form

###Style Show Page

* Add sidebar to show page
* Display comments nicely

###Finish Styling Show Page

* Add public directory
* Add custom stylesheet

###Auth Pt. 1 - Add User Model

* Install all packages needed for auth
* Define User model

###Auth Pt. 2 - Register

* Configure Passport
* Add register routes
* Add register template

###Auth Pt. 3 - Login

* Add login routes
* Add login template

###Auth Pt. 4 - Logout/Navbar

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

###Auth Pt. 5 - Show/Hide Links

* Show/hide auth links in navbar

###Refactor The Routes

* Use Express router to reoragnize all routes

###Users + Comments

* Associate users and comments
* Save author's name to a comment automatically

###Users + Barbershop

* Prevent an unauthenticated user from creating a barbershop
* Save username+id to newly created barbershop

##Editing barbershop
* Add Method-Override
* Add Edit Route for barbershops
* Add Link to Edit Page
* Add Update Route

###Deleting barbershops

* Add Destroy Route
* Add Delete button

###Authorization Part 1: Barbershop
* User can only edit his/her barbershops
* User can only delete his/her barbershops
* Hide/Show edit and delete buttons

###Editing Comments

* Add Edit route for comments
* Add Edit button
* Add Update route

###Deleting Comments

* Add Destroy route
* Add Delete button

###Authorization Part 2: Comments

* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

###Adding in Flash!

* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

##RESTFUL ROUTES

##name url verb desc.
* INDEX /barbershops GET Display a list of all barbershops 
* NEW /barbershops/new GET Displays form to make a new barbershop 
* CREATE /barbershops POST Add new barbershop to DB SHOW /barbershops/:id 
* GET Shows info about one barbershop

* INDEX /barbershops NEW /barbershops/new CREATE /barbershops SHOW /barbershops/:id

* NEW barbershops/:id/comments/new GET CREATE barbershops/:id/comments POST
