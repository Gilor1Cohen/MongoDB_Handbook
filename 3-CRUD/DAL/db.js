const mongoose = require("mongoose");

async function connectDB1() {
  await mongoose.connect("mongodb://127.0.0.1:27017/YourDataBase");
}

connectDB1()
  .then((db) => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));
