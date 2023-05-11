const express = require('express'); //imports Express
const fileUpload = require('express-fileupload'); //adds file upload functionality
const session = require('express-session'); //provides session middleware
const cookieParser = require('cookie-parser'); //parses cookies and populates req.cookies
const flash = require('connect-flash'); //provides flash messages (success and failure)

const app = express(); //creates instance of Express
const expressLayouts = require('express-ejs-layouts'); //reusable templates for views
const path = require('path');
app.use(express.static(path.join(__dirname,'public'))); //setting up middleware for static files



require('dotenv').config(); //loads enviroment variables from .env 

const port = process.env.PORT || 5000; //uses process.env.PORT enviroment variable if set, else port 5000


//middle ware
app.use(express.urlencoded( { extended: true } )); //sets up middleware to parse incoming urlencoded payload requests
app.use(expressLayouts); //sets up expressLayouts middleware

app.use(cookieParser('DiscogDiveSecure')); //middleware to parse cookies sent in requests
app.use(session({
	secret: 'DiscogDiveSecretSession',
	saveUninitialized: true,
	resave: true
})); //sets up middleware to use 'express-session' package
app.use(flash()); //sets up connect-flash middleware
app.use(fileUpload()); //sets up fileupload middleware 



app.set('layout', './layouts/main'); //sets default layout file for EJS template
app.set('view engine', 'ejs'); //Express using EJS templating to render view

const routes = require('./server/routes/discogRoutes.js') //contains routes for web app
app.use('/', routes); //use routes defined in discogRoutes.js to handle requests

app.listen(port, ()=> console.log(`Listening to port ${port}`)); //checking connection to server


