const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config({path:'./config.env'});


/*---------------------database_connection----------------------*/
const DB=process.env.DATABASE;

mongoose.connect(DB,{
      useNewUrlParser:true,
      useCreateIndex:true,
      useUnifiedTopology:true,
      useFindAndModify:false
}).then(()=>{
      console.log('connection established');
}).catch((err)=>{
      console.log('connection not established');
});

/*---------------------middleware----------------------------------*/
const logAuth=(req,res,next) => {
      console.log("user is loged in");
      next();
}

/*-------------------------------------Routing----------------------------------------*/

//home-page
app.get('/', (req, res) => {
      res.send('Hello World! from server');
});

//about-page
app.get('/about',logAuth,(req, res) => {
      res.send('Hello World! about page from server');
});

//contact-page
app.get('/contact', (req, res) => {
      res.send('Hello World! contact page from server');
});

//login-page
app.get('/login', (req, res) => {
      res.send('Hello World! login page from server');
});


 
//signup-page
app.get('/signup', (req, res) => {
      res.send('Hello World! signup page from server');
});





app.listen(3000, () => {
      console.log('listening on port 3000.........');
})