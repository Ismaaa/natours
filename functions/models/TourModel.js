// libs
const mongoose = require('mongoose');
const slugify = require('slugify');

// schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'diffucult'],
        message: 'Difficulty is either: easy, medium, diffucult',
      },
    },
    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    discount: {
      type: Number,
      validate: {
        /* eslint-disable object-shorthand, func-names */
        validator: function (val) {
          // this only points to the current doc on NEW document
          return val < this.price;
        },
        /* eslint-enable object-shorthand, func-names */
        message: 'Discount ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: {
      type: [String], // Array of strings
      required: [true, 'A tour must have images'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // never select
    },
    startDates: {
      type: [Date],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
    },
  },
  {
    // when data is outputted as JSON
    toJSON: {
      virtuals: true,
    },
    // when data is outputted as object
    toObject: {
      virtuals: true,
    },
  }
);

// regular function, so we can use THIS
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

/** MIDDLEWARE / HOOKS */
// ** PRE
// before save and create (not insertMany) middleware/hook
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// pre find middleware/hook [find, findOne, etc]
tourSchema.pre(/^find/, function (next) {
  // hide secret tours
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// ** POST
// post find [find, findOne, etc]
tourSchema.post(/^find/, function (docs, next) {
  // hide secret tours
  console.log(`Query took ${Date.now() - this.start} ms`);
  next();
});

// ** AGGREGATION
tourSchema.pre('aggregate', function (next) {
  // push to beggining of array
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
