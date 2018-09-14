"use strict";
var moment = require('moment');

moment().format();

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");
const ObjectID = require('mongodb').ObjectID;

// const timeStamp = moment().fromNow(created_at);

//       if(timeStamp === "in few seconds"){
//         timeStamp = "few second ago";

//       }
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

  };
}
