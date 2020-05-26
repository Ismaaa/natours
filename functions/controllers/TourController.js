// models
const Tour = require('../models/TourModel');

// handlers
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

class APIFeatures {
  constructor(mongoQuery, urlQuery) {
    this.mongoQuery = mongoQuery;
    this.urlQuery = urlQuery;
  }

  filter() {
    // base query
    const query = { ...this.urlQuery };

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
    this.mongoQuery = this.mongoQuery.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.urlQuery.sort) {
      // transform "price,difficulty" for "price difficulty"
      const sortBy = this.urlQuery.sort.split(',').join(' ');
      // append sort
      this.mongoQuery = this.mongoQuery.sort(sortBy);
    } else {
      this.mongoQuery = this.mongoQuery.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.urlQuery.fields) {
      const fields = this.urlQuery.fields.split(',').join(' ');
      this.mongoQuery = this.mongoQuery.select(fields);
    } else {
      // remove the __v by default
      this.mongoQuery = this.mongoQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.urlQuery.page, 10) || 1;
    const limit = parseInt(this.urlQuery.limit, 10) || 100;
    const skip = (page - 1) * limit;

    this.mongoQuery = this.mongoQuery.skip(skip).limit(limit);

    return this;
  }
}

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
