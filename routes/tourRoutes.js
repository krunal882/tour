const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

router.get(
  '/top-5-cheap',
  tourController.aliasToTours,
  tourController.getAllTours
);

router.get('/tour-stats', tourController.getTourStats);
router.get(
  '/monthly-plan/:year',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  tourController.getMonthlyPlan
);

router.get(
  '/tours-within/:distance/center/:latlng/unit/:unit',
  tourController.getToursWithin
);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

router.patch(
  '/imageCover/:id',
  // authController.protect,
  // authController.restrictTo('admin', 'lead-guide'),
  tourController.uploadTourImageCover,
  tourController.resizeTourImages,
  tourController.updateTour
);
router.patch(
  '/tour-images/:id',
  // authController.protect,
  // authController.restrictTo('admin', 'lead-guide'),
  tourController.uploadTourImages,
  tourController.resizeTourImages,
  tourController.updateTour
);
// router.post(
//   '/:tourId/reviews',
//   authController.protect,
//   authController.restrictTo('user'),
//   reviewController.createReview
// );
router.use('/:tourId/reviews', reviewRouter);

module.exports = router;
