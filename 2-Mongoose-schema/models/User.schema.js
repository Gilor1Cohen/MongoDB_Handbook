const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  // 1. Username: simple text, trimmed and unique
  username: {
    type: String, // sequence of characters
    required: true, // must be provided
    unique: true, // no duplicates allowed
    trim: true, // removes leading/trailing whitespace
  },

  // 2. Email: stored in lowercase and unique
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // converts value to lowercase before saving

    // Basic format check: rejects most invalid emails early
    match: [/^\S+@\S+\.\S+$/, "Email must be in the format username@gmail.com"],
  },

  // 3. Password: hashed before storage in real applications
  password: {
    type: String,
    required: true,
  },

  // 4. Age: numeric value with validation limits
  age: {
    type: Number, // numeric data type
    min: 0, // minimum allowed value
    max: 120, // maximum allowed value
  },

  // 5. Roles: array of strings with a fixed set of allowed values
  roles: {
    type: [String],
    enum: ["user", "admin", "moderator"], // permitted values
    default: ["user"], // default role assignment
  },

  // 6. Array of friend references (one-to-many relationship)
  friends: [
    {
      type: Schema.Types.ObjectId, // ObjectId — each entry references another User
      ref: "User",
    },
  ],

  // 7. Creation timestamp: automatically set to current date/time
  createdAt: {
    type: Date,
    default: Date.now, // default value if none is provided
  },
});

// Export the model for use in application code
module.exports = mongoose.model("User", userSchema);
// The model name 'User' maps to the 'users' collection in MongoDB.
