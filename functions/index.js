// // libs
const mongoose = require('mongoose');
const functions = require('firebase-functions');
const dotenv = require('dotenv');

// modules
const app = require('./app');

// config
dotenv.config({ path: './config.env' });
const DATABASE_CONNECTION = process.env.DATABASE_HOST.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

// database connection
mongoose
  .connect(DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL !');
  });

// start server with firebase functions
exports.app = functions.https.onRequest(app);
