const User = require("../../models/User.schema");

async function deleteOneFun(params) {
  try {
    // Delete the first user document matching the filter in params
    // params could be e.g. { email: 'user@example.com' }
    const result = await User.deleteOne(params);

    // result.deletedCount will be 1 if a document was deleted, 0 otherwise
    return result;
  } catch (error) {
    // Bubble up any errors from the database
    throw error;
  }
}

async function deleteManyFun(params) {
  try {
    // Delete all user documents matching the filter in params
    // params could be e.g. { age: { $lt: 18 } }
    const result = await User.deleteMany(params);

    // result.deletedCount tells how many documents were removed
    return result;
  } catch (error) {
    // Bubble up any errors from the database
    throw error;
  }
}

async function findByIdAndDeleteFun(params) {
  try {
    // params should be the user's ObjectId (or its string form)
    // This finds and removes the document with that _id
    const deletedUser = await User.findByIdAndDelete(params.id);

    // deletedUser is the removed document, or null if none was found
    return deletedUser;
  } catch (error) {
    // Bubble up any errors from the database
    throw error;
  }
}

async function findOneAndDeleteFun(params) {
  try {
    // Delete the first user document matching the filter in params
    // params could be e.g. { username: 'alice' }
    const deletedUser = await User.findOneAndDelete(params);

    // deletedUser is the removed document, or null if none was found
    return deletedUser;
  } catch (error) {
    // Bubble up any errors from the database
    throw error;
  }
}

module.exports = {
  deleteOneFun,
  deleteManyFun,
  findByIdAndDeleteFun,
  findOneAndDeleteFun,
};
