require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected.');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
