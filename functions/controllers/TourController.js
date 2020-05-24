// models
const Tour = require('../models/TourModel');

// handlers
exports.getAllTours = async (req, res) => {
  try {
    // base query
    let query = { ...req.query };

    // exlude some params
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete query[field]);

    // advanced filtering
    let queryString = JSON.stringify(query);

    // replace ie: gte for $gte to follow mongodb format
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    // generate mongoose query
    query = Tour.find(JSON.parse(queryString));

    // sorting
    if (req.query.sort) {
      // transform "price,difficulty" for "price difficulty"
      const sortBy = req.query.sort.split(',').join(' ');
      // append sort
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // remove the __v by default
      query = query.select('-__v');
    }

    // execute query
    const models = await query;

    // response
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
      message: error,
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
      message: error,
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
      message: error,
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
      message: error,
    });
  }
};
