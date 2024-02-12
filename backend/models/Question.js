const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  text: { type: String, required: true },
  reference: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema, 'questions');