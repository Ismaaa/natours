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
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL !');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// start server with firebase functions
exports.app = functions.https.onRequest(app);
