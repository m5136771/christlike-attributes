const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  section: { type: String, required: true },
  text: { type: String, required: true },
  reference: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema, 'questions');

module.exports = Question;