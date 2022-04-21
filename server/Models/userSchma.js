const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      profession: {
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
      tokens: [{
            token: {
                  type: String,
                  required: true
            }
      }]


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


/*---------------generation jwt --------------------*/
userSchma.methods.generateAuthToken = async function () {
      try {
            //database_id:create _id during registration or login
            //token generated and new token field is created in the database
            let new_token = jwt.sign({
                  _id: this._id
            }, process.env.SECRET_KEY)

            //now adding the token to the database
            this.tokens = this.tokens.concat({
                  token: new_token
            });
             this.save();

            return new_token;


      } catch (e) {
            console.log(e);
      }

}

/*--------------------------------MODEL---------------------------------*/
const User = mongoose.model('REGISTER', userSchma);


module.exports = User;