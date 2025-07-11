const User = require("../../models/User.schema");

// find
async function findFun(params) {
  try {
    // Find all users matching the filter criteria in params.
    // For example: { age: { $gte: 18 } } finds users aged 18 or older.
    const users = await User.find(params);

    // Return the list of users found
    return users;
  } catch (error) {
    throw error;
  }
}

// Find users aged between 18 and 30 (inclusive)
const youngAdults = await User.find({
  age: {
    $gte: 18, // age ≥ 18
    $lte: 30, // age ≤ 30
  },
});

// Find users who are over 18 AND also have the "moderator" role
const adultMods = await User.find({
  $and: [
    { age: { $gt: 18 } }, // age > 18
    { roles: "moderator" }, // roles array contains "moderator"
  ],
});

// Find users that do not have an "age" field at all
const missingAge = await User.find({
  age: { $exists: false }, // the "age" field is missing
});

// Find users whose email ends with "@gmail.com"
const gmailUsers = await User.find({
  email: {
    $regex: /@gmail\.com$/, // match the regex pattern at the end of the string
  },
});

// findOne
async function findOneFun(params) {
  try {
    // Find a single user that matches the filter criteria in params.
    // For example: { username: 'alice' } finds the first user with that username.
    const user = await User.findOne(params);

    // Return the user document (or null if no match is found)
    return user;
  } catch (error) {
    throw error;
  }
}

// findById
async function findByIdFun(params) {
  try {
    // Find a user by its _id value (params should be the user's ObjectId or its string)
    const user = await User.findById(params.id);

    // Return the user document, or null if no user with that ID exists
    return user;
  } catch (error) {
    throw error;
  }
}

// findByIdAndUpdate
async function findByIdAndUpdateFun(params) {
  try {
    // params.id should be the user’s ObjectId (or its string form)
    // params.updateData is an object with the fields to change, e.g. { age: 30, roles: ['admin'] }
    // new: true returns the updated document instead of the original
    // runValidators: true makes Mongoose re-check schema rules on the update
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      params.updateData,
      { new: true, runValidators: true }
    );

    // Return the updated user document (or null if no user was found)
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

// findByIdAndDelete
async function findByIdAndDeleteFun(params) {
  try {
    // params.id should be the user’s ObjectId (or its string form)
    // This deletes the matching user document
    const deletedUser = await User.findByIdAndDelete(params.id);

    // Return the deleted user document (or null if no user was found)
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

async function findOneAndUpdateFun(params) {
  try {
    // params.filter is an object with the query criteria,
    // e.g. { email: 'alice@example.com' }
    // params.updateData is an object with the fields to change,
    // e.g. { age: 25, roles: ['moderator'] }
    // new: true returns the updated document instead of the original
    // runValidators: true enforces schema validation on the update
    const updatedUser = await User.findOneAndUpdate(
      params.filter,
      params.updateData,
      { new: true, runValidators: true }
    );

    // Return the updated user document (or null if no match)
    return updatedUser;
  } catch (error) {
    // Throw any database errors for the caller to handle
    throw error;
  }
}

async function findOneAndDeleteFun(params) {
  try {
    // params.filter is an object with the query criteria,
    // e.g. { username: 'bob' }
    // This deletes the first user matching the filter
    const deletedUser = await User.findOneAndDelete(params.filter);

    // Return the deleted user document (or null if no match)
    return deletedUser;
  } catch (error) {
    // Throw any database errors for the caller to handle
    throw error;
  }
}

/*
Query Operators Cheat Sheet (grouped by category):

// 1. Comparison Operators
// -----------------------
- $eq    // Matches values equal to the specified value
- $gt    // Matches values greater than the specified value
- $gte   // Matches values greater than or equal to the specified value
- $lt    // Matches values less than the specified value
- $lte   // Matches values less than or equal to the specified value
- $ne    // Matches values not equal to the specified value
- $in    // Matches values that are in the specified array
- $nin   // Matches values that are not in the specified array

// 2. Logical Operators
// --------------------
- $and   // Joins clauses with a logical AND (all must be true)
- $or    // Joins clauses with a logical OR (at least one must be true)
- $not   // Inverts the effect of a query expression
- $nor   // Joins clauses with a logical NOR (none can be true)

// 3. Element Operators
// --------------------
- $exists      // Matches documents that have (or do not have) the specified field
- $type        // Matches documents where the field is of the specified BSON type

// 4. Evaluation Operators
// -----------------------
- $expr        // Allows use of aggregation expressions in queries
- $jsonSchema  // Validates documents against a JSON Schema
- $mod         // Performs a modulo operation: { $mod: [divisor, remainder] }
- $regex       // Matches string values against a regular expression
- $text        // Performs a text search on string content (requires text index)
- $where       // Matches documents using a JavaScript expression (use sparingly)

// 5. Geospatial Operators
// -----------------------
- $geoWithin     // Matches documents with geospatial data within a specified geometry
- $geoIntersects // Matches documents with geospatial data intersecting a specified geometry
- $near          // Returns documents ordered by proximity to a point (2d index)
- $nearSphere    // Returns documents ordered by proximity on a spherical surface (2dsphere index)

// 6. Array Operators
// ------------------
- $all        // Matches arrays that contain all the specified elements
- $elemMatch  // Matches arrays containing at least one element satisfying multiple criteria
- $size       // Matches arrays with the specified number of elements

// 7. Bitwise Operators
// --------------------
- $bitsAllClear  // Matches numbers in which all given bit positions are clear (0)
- $bitsAllSet    // Matches numbers in which all given bit positions are set (1)
- $bitsAnyClear  // Matches numbers in which any given bit positions are clear (0)
- $bitsAnySet    // Matches numbers in which any given bit positions are set (1)
*/

module.exports = {
  findFun,
  youngAdults,
  adultMods,
  missingAge,
  gmailUsers,
  findOneFun,
  findByIdFun,
  findByIdAndUpdateFun,
  findByIdAndDeleteFun,
  findOneAndUpdateFun,
  findOneAndDeleteFun,
};
