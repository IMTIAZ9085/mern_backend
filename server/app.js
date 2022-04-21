const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
      path: './config.env'
});


/*---------------------database_connection----------------------*/
require('./DB/conn'); //database_connection

app.use(express.json()); //it is simply changing the jason data in string mode



const PORT = process.env.PORT;

// const User = require('./Models/userSchma');


/*------------------------middleware----------------------------------*/
const logAuth = (req, res, next) => {
      console.log("user is loged in");
      next();
}

/*------------------------- Routing----------------------------------------*/
app.use(require('./Router/auth')); //link the router file to make the route
// //home-page
// app.get('/', (req, res) => {
//       res.send('Hello World! from server');
// });

// //about-page
// app.get('/about',logAuth,(req, res) => {
//       res.send('Hello World! about page from server');
// });

// //contact-page
// app.get('/contact', (req, res) => {
//       res.send('Hello World! contact page from server');
// });

// //login-page
// app.get('/login', (req, res) => {
//       res.send('Hello World! login page from server');
// });



// //signup-page
// app.get('/signup', (req, res) => {
//       res.send('Hello World! signup page from server');
// });





app.listen(PORT, () => {
      console.log(`listening on port ${PORT}.........`);
})