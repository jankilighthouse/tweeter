"use strict";
// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const sassMiddleware = require('node-sass-middleware');
const path = require('path');

const STATIC_DIR = path.join(__dirname, "../public");
const SCSS_DIR = path.join(STATIC_DIR, 'scss');
const STYLE_DIR = path.join(STATIC_DIR, 'styles');

app.use(sassMiddleware({
  /* Options */
  src: SCSS_DIR, // where your scss file stay
  dest: STYLE_DIR, // where your want to output your style.css
  debug: true,
  outputStyle: 'compressed',
  prefix: '/styles/', // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(express.static(STATIC_DIR));

// The in-memory database of tweets. It's a basic object with an array in it.
const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
});
