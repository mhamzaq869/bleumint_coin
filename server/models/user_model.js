const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  wallet_address: {
    type: String,
  },
  user_check: {
    type: Boolean
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
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
