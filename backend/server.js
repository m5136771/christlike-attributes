const express = require('express');
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const dbconnect = require('./dbconnect');
const User = require('./models/User');
const Question = require('./models/Question');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection
dbconnect();

// Manage Users with Firebase Admin SDK
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

// API routes
app.post('/api/users', async (req, res) => {

   try {
      // Create user in MongoDB
      const newUser = new User(req.body);
      console.log(newUser);
      const savedUser = await newUser.save();
      console.log(savedUser);

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

app.get('/api/questions', async (req, res) => {
   try {
      const q = await Question.find();
      console.log(q);
      res.json(q);
   } catch (error) {
      res.status(500).send(error.message);
   }
});

// Server
const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
   console.log(`Listening on port ${port}...`);
});