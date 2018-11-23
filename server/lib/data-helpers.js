"use strict";
var moment = require('moment');
moment().format();
// Simulates the kind of delay we see with network or filesystem operations
const ObjectID = require('mongodb').ObjectID;
console.log("oo",ObjectID)

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
  getTweets: function (callback) {
    db.collection('tweets').find().toArray((err,tweets) => {
        // Function for Moment
      tweets.forEach(function(tweet){
      tweet.created_at = moment().to(tweet.created_at);
    })
      callback(null,tweets);
    });
  },
    // Saves a tweet to `db`
  saveTweet: function (newTweet, callback) {
    db.collection('tweets').insertOne(newTweet, callback);
  },
updateLikes: function(data, callback) {
      const id = data.id;
      const status = data.likeStatus;
      const collection = db.collection('tweets');
      if (status === 'add') {
        collection.findOneAndUpdate(
          { _id: ObjectID(id) },
          { $inc : { 'likes': 1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      } else if (status === 'remove') {
        collection.findOneAndUpdate(
          { _id: ObjectID(id) },
          { $inc : { 'likes': -1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      }
    }
 };
}
