const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { SERVER_PORT } = require('./config');

const dbconnect = require('./dbconnect');
const Question = require('./models/Question');

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());

// MongoDB connection
dbconnect();

// API routes
app.get('/api/questions', async (req, res) => {
   try {
      const q = await Question.find({ reference: ''});
      console.log(q);
      res.json(q);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

// Server
const port = SERVER_PORT || 5000;
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});