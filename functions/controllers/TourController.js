// models
const Tour = require('../models/TourModel');
const APIFeatures = require('../utils/apiFeatures');

// handlers
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Init features and pass an empty query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // execute query
    const models = await features.mongoQuery;

    // response
    res.status(200).json({
      status: 'success',
      results: models.length,
      data: { tours: models },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const model = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: model,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
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
      message: error.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const model = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour: model,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { rating: { $gte: 2 } },
      },
      {
        $group: {
          // group by
          _id: '$difficulty',
          // calculated values
          toursCount: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$rating' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);    

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
