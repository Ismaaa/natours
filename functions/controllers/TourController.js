// models
const Tour = require('../models/TourModel');

// handlers
exports.getAllTours = async (req, res) => {
  try {
    const models = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: models.length,
      data: { tours: models },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.getTour = (req, res) => {
  // Find by ID
  // const id = parseInt(req.params.id, 10); // To decimal
  // const tour = tours.find((item) => item.id === id);

  res.status(200).json({
    status: 'success',
    params: req.params,
    // tour,
  });
};

exports.createTour = async (req, res) => {
  try {
    const model = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: model,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // It won't return anything, as we are using 204
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
