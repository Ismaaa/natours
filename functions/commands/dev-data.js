/** USAGE */
// make import-data
// make delete-data

// libs
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// models
const Tour = require('../models/TourModel');

// config
dotenv.config({ path: `${__dirname}/../config.env` });
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

// read data file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// perform import
const importData = async () => {
  try {
    await Tour.collection.insert(tours);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
