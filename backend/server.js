const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const dbconnect = require('./dbconnect');
const User = require('./models/User');
const Question = require('./models/Question');
const Response = require('./models/Response');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
dbconnect();

// Manage Users with Firebase Admin SDK
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

// User API routes
app.post('/api/users', async (req, res) => {

   try {
      // Create user in MongoDB
      const newUser = new User(req.body);
      console.log('Creating new user:', newUser);
      const savedUser = await newUser.save();
      console.log('User saved:', savedUser);

      // Create user in Firebase with the same _id
      try {
         const userRecord = await admin.auth().createUser({
            uid: savedUser._id.toString(),
            email: savedUser.email,
            password: savedUser.password
         });
         console.log('Successfully created new user:', userRecord.uid);
         res.status(201).json({ savedUser, userRecord });
      } catch (error) {
         console.log('Error creating new user in Firebase:', error);
         res.status(500).send(error.message);
      }
   } catch (error) {
      console.error('Error creating new user in MongoDB:', error);
      res.status(500).send(error.message);
   }
});

app.get('/api/users/:uid', async (req, res) => {
   try {
      const userDoc = await User.findById(req.params.uid);
      console.log('Found user:', userDoc);
      res.json(userDoc);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

app.put('/api/users/:uid', async (req, res) => {
   try {
      const userDoc = await User.findByIdAndUpdate(
         req.params.uid,
         req.body,
         { new: true }
      );
      console.log('Updated user:', userDoc);
      res.json(userDoc);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

// Question API routes
app.get('/api/questions', async (req, res) => {
   try {
      const q = await Question.find();
      console.log('Found questions at /api/questions:');
      res.json(q);
   } catch (error) {
      res.status(500).send(error.message);
   }
});


// Response API routes
app.post('/api/responses', async (req, res) => {
   try {
      const newResponse = new Response(req.body);
      console.log('Creating new response:', newResponse);

      const savedResponse = await newResponse.save();
      res.status(201).json(savedResponse);
   } catch (error) {
      console.error('Error saving response:', error);
      res.status(500).send(error.message);
   }
});

app.get('/api/responses/:questionId/:userId', async (req, res) => {
   console.log('Request parameters:', req.params);
   try {
      const response = await Response.findOne({
         question: new ObjectId(req.params.questionId),
         user: new ObjectId(req.params.userId)
      });
      if (response) {
         console.log('Found existing response:', response);
         res.json(response);
      } else {
         console.log('Response not found');
         return res.status(404).send('Response not found');
      }
   } catch (error) {
      console.error('Error finding response:', error);
      res.status(500).json({ message: error.message });
   }
});

app.get('/api/user-responses/:userId', async (req, res) => {
   console.log('Request parameters:', req.params);
   try {
      const responses = await Response.find({ user: new ObjectId(req.params.userId) })
         .populate('question', 'section')
         .exec();

      const data = responses.map(r => ({
         section: r.question.section,
         response: r.response
      }));

      res.json(data);
   } catch (error) {
      console.error('Error fetching user responses:', error);
      res.status(500).send('Error fetching user responses: ' + error.message);
   }
});


app.put('/api/responses/:responseId', async (req, res) => {
   try {
      const updatedResponse = await Response.findByIdAndUpdate(
         req.params.responseId,
         req.body,
         { new: true }
      );
      console.log('Updated response:', updatedResponse);
      res.json(updatedResponse);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

// Server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});