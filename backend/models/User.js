const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  password: { // Hashed
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: false
  },
  photoURL: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');