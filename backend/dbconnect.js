const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("You successfully connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
        process.exit(1);
    }
};

mongoose.connection.on('connected', () => console.log('connected'));

module.exports = dbconnect;