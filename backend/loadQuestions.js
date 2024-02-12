const mongoose = require('mongoose');
const questionBank = require('./question-bank.json');
const Question = require('./models/Question');
const dbconnect = require('./dbconnect');

async function loadQuestions() {
	try {
		await dbconnect();

		const result = await Question.insertMany(questionBank.questions);
		console.log('Questions loaded successfully! Number of questions inserted:', result.length);
	} catch (error) {
		console.error('Error loading questions:', error);
	}
}

loadQuestions();
