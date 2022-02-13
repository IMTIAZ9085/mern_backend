const mongoose = require('mongoose');


/*----------------------USERSCHEMA IS READY-----------------------*/
const userSchma = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true
      },
      phoneNo: {
            type: Number,
            required: true
      },
      work: {
            type: String,
            required: true
      },
      password: {
            type: String,
            required: true
      },
      C_password: {
            type: String,
            required: true
      },


});


/*--------------------------------MODEL---------------------------------*/
const User = mongoose.model('REGISTER', userSchma);


module.exports = User;