const mongoose = require("mongoose");

// Option 1: Using async/await for a clean, promise-based connection
async function connectDB1() {
  // mongoose.connect returns a Promise that resolves when connection is successful
  await mongoose.connect("mongodb://127.0.0.1:27017/YourDataBase");
}

// Invoke the async function and handle success or failure
connectDB1()
  .then((db) => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

// Option 2: Using a manual Promise constructor with callback-style connection
function connectDB2() {
  return new Promise((resolve, reject) => {
    // Connection options to avoid deprecation warnings and enable new topology engine
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

    // mongoose.connect accepts a callback that receives error or database instance
    mongoose.connect(
      "mongodb://127.0.0.1:27017/YourDataBase",
      options,
      (err, db) => {
        if (err) {
          // Reject the promise if an error occurs during connection
          reject(err);
        } else {
          // Resolve the promise with the database instance on success
          resolve(db);
        }
      }
    );
    // Note: The second connect call without options/callback is redundant and can be removed
    // mongoose.connect("mongodb://127.0.0.1:27017/YourDataBase");
  });
}

// Example usage of connectDB2:
connectDB2()
  .then((db) => console.log("Connected via Option 2"))
  .catch((err) => console.error("Connection error with Option 2:", err));
