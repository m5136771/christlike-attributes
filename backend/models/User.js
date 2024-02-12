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
  firstName: {
    type: String,
    required: false
  },
  lastName: {
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
  },
  currentQuestionIndex: {
    type: Number,
    required: false,
    default: 0
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');