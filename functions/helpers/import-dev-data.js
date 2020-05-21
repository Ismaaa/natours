// // libs
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// models
const Tour = require('../models/TourModel');

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

