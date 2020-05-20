// // libs
const functions = require('firebase-functions');
const dotenv = require('dotenv');

// modules
const app = require('./app');

// config
dotenv.config({ path: './config.env' });

// start server with firebase functions
exports.app = functions.https.onRequest(app);
