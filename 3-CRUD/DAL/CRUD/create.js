const User = require("../../models/User.schema");

// insertOneFun:
// Uses User.insertOne() to add a single document to MongoDB.
// Under the hood this calls the native MongoDB driver's insertOne method.
// Logs the new document’s _id when the operation succeeds.
// Example usage:
//   await insertOneFun({
//     username: "johndoe",
//     email:    "johndoe@gmail.com",
//     password: "hashedPassword123",
//     age:       30,
//     roles:    ["user"],
//     friends:  []
//   });
async function insertOneFun(userData) {
  try {
    // insertOne returns a result object containing insertedId
    const result = await User.insertOne(userData);
    console.log("User inserted successfully, id:", result.insertedId);
  } catch (error) {
    throw error;
  }
}

// insertManyFun:
// Uses User.insertMany() to insert multiple documents in one batch.
// More efficient than calling insertOne multiple times.
// Returns an array of the inserted documents.
// Example usage:
//   await insertManyFun([
//     { username: "alice", email: "alice@gmail.com", password: "pwAlice", age: 25 },
//     { username: "bob",   email: "bob@gmail.com",   password: "pwBob",   age: 28 }
//   ]);
async function insertManyFun(usersData) {
  try {
    // insertMany returns an array of created documents
    const insertedUsers = await User.insertMany(usersData);
    console.log(`${insertedUsers.length} users inserted successfully`);
  } catch (error) {
    throw error;
  }
}

module.exports = { insertOneFun, insertManyFun };
