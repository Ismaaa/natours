// libs
const express = require('express');

// handlers
const {
  aliasTopTours,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  getTourStats,
} = require('../controllers/TourController');

// router
const router = express.Router();

// routes
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
