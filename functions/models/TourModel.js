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
    },
    rating: {
      type: Number,
      default: 4.5,
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

// regular function, so we can use this
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// before save and create (not insertMany) middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
