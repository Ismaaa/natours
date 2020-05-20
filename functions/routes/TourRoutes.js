// libs
const express = require('express');

// handlers
const {
  checkID,
  checkBody,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/TourController');

// router
const router = express.Router();

// router params
router.param('id', checkID);

// routes
router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;