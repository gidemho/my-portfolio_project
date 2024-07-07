require("dotenv").config();
const mongoose = require("mongoose");

/* 
- A function to initiate connection to the MongoDB database
*/
async function dbConnect() {
  try {
    const dbString = `mongodb+srv://${process.env.PROD_DB_USERNAME}:${process.env.PROD_DB_PASSWORD}@cluster0.rmjefxt.mongodb.net`;
    await mongoose.connect(dbString, {
      dbName: "GBlog", // Replace with your actual database name
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

module.exports = dbConnect;
