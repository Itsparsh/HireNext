/* global require, process, module, __dirname */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

let mongoServer;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // If no URI is provided, use in-memory database automatically
    if (!mongoUri) {
      console.log('No MONGO_URI provided. Starting in-memory MongoDB server...');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    if (!process.env.MONGO_URI) {
      console.log(`In-Memory Database ready at: ${mongoUri}`);
    }

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.error(`⚠️ If you are using MongoDB Atlas and a dynamic IP (like 5G), your IP might have changed!`);
    console.error(`👉 Go to MongoDB Atlas > Network Access > Add IP Address > Allow Access From Anywhere (0.0.0.0/0)`);
    console.error(`⚠️ The server is still running, but database operations will fail until you fix the connection.`);
    // Removed process.exit(1) so the server stays alive
  }
};

module.exports = connectDB;
