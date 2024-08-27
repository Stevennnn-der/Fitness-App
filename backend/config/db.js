const mongoose = require("mongoose");
const dotenv = require("dotenv");
const functions = require("firebase-functions");

dotenv.config();

// const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_URL = functions.config().mongodb.url
const db = async () => {
  try {
    const con = await mongoose.connect(MONGODB_URL);
    console.log(`mongodb connected: ${con.connection.host}`);
  } catch (error) {
    console.error(`FAILED TO CONNECT DATABASE: ${error}!`);
  }
};

module.exports = db; 