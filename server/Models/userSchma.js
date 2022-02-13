const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


//middleware
//hashing our password 
userSchma.pre('save', async function (next) {
      if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 12);
            this.C_password = await bcrypt.hash(this.C_password, 12);
      }

      next();
});


/*--------------------------------MODEL---------------------------------*/
const User = mongoose.model('REGISTER', userSchma);


module.exports = User;