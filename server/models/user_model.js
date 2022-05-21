const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // googleId: {
  //   type: String,
  //   required: true,
  // },  
  // firstName: {
  //   type: String,
  //   // required: true
  // },
  // lastName: {
  //   type: String,
  //   // required: true
  // },
  // email: {
  //   type: String,
  //   // required: true
  // },
  // phone: {
  //   type: String,
  //   // required: true
  // },
  // password: {
  //   type: String,
  //   // required: true
  // },
  // wallet_address:{
  //     type: String,
  // },
  // user_check : {
  //   type:Boolean,
  // }
  googleId: {
    type: String,
    // required: true,
  },  
  facebookId: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    // required: true
  },
  twitterId: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true
  },
  phone: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  wallet_address:{
      type: String,
  },
  user_check : {
    type:Boolean,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // you have to change role manually from db 
    default: 'user',
  },

  passport_image: {
    type : Array,
  },
  driving_license: {
    type : Array,
  },
  nid_image: {
    type : Array,
  },
  verified: {
    type: Boolean,
    default: false
  }

});

const User = mongoose.model("users", UserSchema);

module.exports = User;
