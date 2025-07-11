const User = require("../../models/User.schema");

async function updateFun(params) {
  try {
    // Update documents matching params.filter with params.updateData
    // params.options can include: { multi: true } to update multiple docs,
    // or { runValidators: true } to enforce schema validation
    const result = await User.update(
      params.filter,
      params.updateData,
      params.options
    );

    // result contains info like matchedCount and modifiedCount
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateOneFun(params) {
  try {
    // Update the first document matching params.filter
    // runValidators: true ensures our schema rules are checked on update
    const result = await User.updateOne(params.filter, params.updateData, {
      runValidators: true,
    });

    // result.nModified will be 1 if a document was updated, 0 otherwise
    return result;
  } catch (error) {
    throw error;
  }
}

async function updateManyFun(params) {
  try {
    // Update all documents matching params.filter
    const result = await User.updateMany(params.filter, params.updateData, {
      runValidators: true,
    });

    // result.nModified tells how many documents were changed
    return result;
  } catch (error) {
    throw error;
  }
}

async function findByIdAndUpdateFun(params) {
  try {
    // params.id is the user's ObjectId (or its string)
    // new: true returns the updated document instead of the original
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      params.updateData,
      { new: true, runValidators: true }
    );

    // updatedUser is the modified document, or null if not found
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function findOneAndUpdateFun(params) {
  try {
    // params.filter finds one matching user
    // new: true returns the updated document
    const updatedUser = await User.findOneAndUpdate(
      params.filter,
      params.updateData,
      { new: true, runValidators: true }
    );

    // updatedUser is the modified document, or null if none matched
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

/*
Update Operators (grouped by category):

// 1. Field Update Operators
- $currentDate    // Sets the field to the current date or timestamp
- $inc            // Increments the field by a specified value
- $min            // Updates the field only if the specified value is less than the current field value
- $max            // Updates the field only if the specified value is greater than the current field value
- $mul            // Multiplies the field value by a specified amount
- $rename         // Renames a field
- $set            // Sets the value of a field
- $setOnInsert    // Sets the value of a field only if the operation results in an insert (upsert)
- $unset          // Removes the specified field from a document

// 2. Array Update Operators
- $               // Positional operator: updates the first matching array element
- $[]             // All positional operator: updates all elements in an array
- $[<identifier>] // Filtered positional operator: updates elements that match arrayFilters
- $addToSet       // Adds elements to an array only if they do not already exist
- $pop            // Removes the first or last element of an array
- $pull           // Removes all array elements that match a specified condition
- $push           // Adds an element to an array
- $pullAll        // Removes all instances of the specified values from an array

// 3. Array Update Operator Modifiers
- $each           // Modifies $push and $addToSet to append multiple items
- $position       // Specifies the position in the array at which to add elements (with $push)
- $slice          // Limits the size of an array after an update (with $push)
- $sort           // Reorders elements in an array (with $push)

// 4. Bitwise Update Operators
- $bit            // Performs bitwise AND, OR, and XOR updates on integer values
*/

module.exports = {
  updateFun,
  updateOneFun,
  updateManyFun,
  findByIdAndUpdateFun,
  findOneAndUpdateFun,
};
