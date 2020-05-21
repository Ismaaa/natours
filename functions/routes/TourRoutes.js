// libs
const express = require('express');

// handlers
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/TourController');

// router
const router = express.Router();

// routes
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
