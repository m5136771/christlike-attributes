const questionBank = require('./question-bank.json');
const dbconnect = require('../dbconnect');

async function loadQuestions() {
	let client;

	try {
		client = await dbconnect();
		const db = client.db('becoming');
		const Question = db.collection('questions');

		await Question.insertMany(questionBank.questions);
		console.log('Questions loaded successfully!');
	} catch (error) {
		console.error('Error loading questions:', error);
	} finally {
		if (client) {
			client.close();
		}
	}
}

loadQuestions();