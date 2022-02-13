const express = require('express');
const router = express.Router();

/*-----------------database connection----------------------------*/
require("../DB/conn");
const User = require("../Models/userSchma");

//home-page
router.get('/', (req, res) => {
      res.send('Hello World! from server');
});

router.post('/register', async (req, res) => {

      //object destructuring
      const {
            name,
            email,
            phoneNo,
            work,
            password,
            C_password
      } = req.body;

      if (!name || !email || !phoneNo || !work || !password || !C_password) {
            return res.status(422).json({
                  error: "plz fill all the field"
            });
      }


      /*------------------------------USING PROMISES---------remove async when using promises---------------------------------------*/

      //database_email:Userfill_email
      //if the user has already registered then it with return error or else it will store the user data
      // User.findOne({email:email})
      //      .then((userExist)=>{
      //            if(userExist){
      //             return res.status(422).json({error:"plz fill all the field properly"});
      //            }
      //                                //name:name email:email(something like that es6 property)
      //            const user=new User({name, email, phoneNo, work, password, C_password});
      //            user.save().then(()=>{
      //                  res.status(201).json({message:"successfully registered"});
      //            }).catch((err)=>res.status(500).json({error:"Register Failed"}));
      //      }).catch((err)=>{console.log(err)});


      /*------------------USING async await------------------------------------------------*/

      //database_email:Userfill_email
      //if the user has already registered then it with return error or else it will store the user data
      try {
            const userExist = await User.findOne({
                  email: email
            });
            if (userExist) {
                  return res.status(422).json({
                        error: "Email already registered"
                  });
            }
            //name:name email:email(something like that es6 property)
            const user = new User({
                  name,
                  email,
                  phoneNo,
                  work,
                  password,
                  C_password
            });
            const dataSave = await user.save();

            if (dataSave) {
                  res.status(201).json({
                        message: "successfully registered"
                  });
            } else {
                  res.status(500).json({
                        error: "Register Failed"
                  })
            }

      } catch (err) {
            console.log(err)
      };



});





//about-page
router.get('/about', (req, res) => {
      res.send('Hello World! about page from server');
});

//contact-page
router.get('/contact', (req, res) => {
      res.send('Hello World! contact page from server');
});

//login-page
router.get('/login', (req, res) => {
      res.send('Hello World! login page from server');
});



//signup-page
router.get('/signup', (req, res) => {
      res.send('Hello World! signup page from server');
});



module.exports = router;