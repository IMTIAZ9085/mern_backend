const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
            profession,
            password,
            C_password
      } = req.body;

      if (!name || !email || !phoneNo || !profession || !password || !C_password) {
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
      //            const user=new User({name, email, phoneNo, profession, password, C_password});
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
            } else if (password != C_password) {
                  return res.status(422).json({
                        error: "Password are no matching"
                  });
            } else {
                  //name:name email:email(something like that es6 property)
                  const user = new User({
                        name,
                        email,
                        phoneNo,
                        profession,
                        password,
                        C_password
                  });

                  //middleware in userSchma page
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


            }

      } catch (err) {
            console.log(err)
      };



});


//login-page
router.post('/login', async (req, res) => {
      try {
            const {
                  email,
                  password
            } = req.body;

            if (!email || !password) {
                  return res.status(400).json({
                        error: "Fill All the Field"
                  });
            }
            const userLogin = await User.findOne({
                  email: email
            }); //this gives the all details about this email id

            if (userLogin) {
                  const Password_match = await bcrypt.compare(password, userLogin.password);

                  //----------------------jwt authentication-----------------------------------------------
                  //function define in userSchema
                  const token = await userLogin.generateAuthToken();
                  // console.log(token);

                  
                  //now we are storing the token in the cookie
                  res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: true
                  });

                  if (!Password_match) {
                        res.status(400).json({
                              error: "Invalid Credentials"
                        })
                  } else {
                        res.status(201).json({
                              message: "Login successfull"
                        })
                  }

            } else {
                  res.status(400).json({
                        error: "Invalid Credentials"
                  })
            }



      } catch (err) {
            console.log(err);
      }

});


//about-page
router.get('/about', (req, res) => {
      res.send('Hello World! about page from server');
});

//contact-page
router.get('/contact', (req, res) => {
      res.send('Hello World! contact page from server');
});



//signup-page
router.get('/signup', (req, res) => {
      res.send('Hello World! signup page from server');
});



module.exports = router;