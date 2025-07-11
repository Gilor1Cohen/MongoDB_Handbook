const User = require("../../models/User.schema");

// Aggregation in MongoDB is a way to process and combine your data directly on the database server by passing documents through a series of simple steps called stages. Each stage (for example, $match to filter, $group to summarize, or $project to reshape) takes the results from the previous step and transforms them before passing them on. Using aggregation lets you get summaries, counts, joined data, and other insights without having to pull all your data into your application first.

async function getUsersWithFriends() {
  try {
    const results = await User.aggregate([
      // 1. For each User, lookup full friend docs from the same "users" collection
      {
        $lookup: {
          from: "users", // the MongoDB collection name for User
          localField: "friends", // array of ObjectId references
          foreignField: "_id", // field in "users" to match against
          as: "friendDocs", // output array field
        },
      },
      // 2. Add a field that counts how many friends each user has
      {
        $addFields: {
          friendCount: { $size: "$friendDocs" },
        },
      },
      // 3. Project only the fields we care about
      {
        $project: {
          _id: 0,
          username: 1,
          email: 1,
          friendCount: 1,
          friends: "$friendDocs.username", // show only their friends’ usernames
        },
      },
      // 4. Sort by number of friends descending
      {
        $sort: { friendCount: -1 },
      },
    ]);
  } catch (error) {
    throw error;
  }
}

// $match: filters documents by given criteria (like WHERE in SQL)
// $group: groups documents by a specified key and computes accumulations (like GROUP BY … with COUNT/SUM in SQL)
// $project: selects, renames, or computes fields in the output documents (like SELECT col AS alias or expressions in SQL)
// $sort: orders documents by one or more fields (like ORDER BY in SQL)
// $limit: restricts the number of documents passed through (like LIMIT in SQL)
// $unwind: deconstructs an array field so each element becomes its own document (similar to unnesting rows from a one-to-many child table in SQL)
// $addFields: adds new or updates existing fields in each document (like adding computed columns in SQL)
// $count: returns the count of documents that have passed through up to that stage (like SELECT COUNT(\*) in SQL)

// $lookup: performs a LEFT OUTER JOIN between the current collection and another collection, adding a new array field with all matching documents
// – from: name of the collection to join (equivalent to the target table in an SQL JOIN)
// – localField: field in the input documents to match against the foreign collection
// – foreignField: field in the “from” collection to compare with localField
// – as: name of the new array field to hold matched documents (empty array if no matches)
// – default behavior mirrors a LEFT OUTER JOIN in MySQL, all input documents are retained even if no matches are found
// – supports an advanced form with let and pipeline:
//     • let: defines variables to pass into the sub-pipeline
//     • pipeline: allows embedding additional stages (e.g., $match, $project, $group) within the lookup
// – ensure an index exists on foreignField to improve performance and avoid full collection scans
// – by merging data server-side, $lookup reduces the need for multiple application-layer queries, similar to combining tables in a single SQL query
