const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  answer: {
    type: Number, // Assuming answers are numerical ratings
    required: true
  },
  // Include timestamp or other relevant fields as needed
}, { timestamps: true });

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;