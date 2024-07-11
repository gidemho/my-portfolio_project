require("dotenv").config();
const mongoose = require("mongoose");

/* 
- A function to initiate connection to the MongoDB database
*/
async function dbConnect() {
  try {
    // const dbString = `mongodb+srv://${process.env.PROD_DB_USERNAME}:${process.env.PROD_DB_PASSWORD}@cluster0.rmjefxt.mongodb.net`;
    const dbString = process.env.DB_STRING
    await mongoose.connect(dbString, {
      dbName: "GBlog", 
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
}

module.exports = dbConnect;
