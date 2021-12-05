const router = require('express').Router();
const db = require('../models');

// using public/api.js to build following routes to return as JSON

// getLastWorkout() (public/api.js line 2)
// GET entire workout library

// router.get('/api/workouts/', (req, res) => {
//   // sum aggregation + addFields: https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
//   db.Workout.aggregate(
//     [
//       {
//         $addFields: {
//           // based off of seed.js
//           day: '$day',
//           // 
//           totalDuration: {
//             $sum: '$exercises.duration'
//           }
//         }
//       }
//     ])
// });

// getLastWorkout() (public/api.js line 2)
// GET entire workout library
router.get('/api/workouts', (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    // error otherwise
    .catch((err) => {
      res.status(400).json(err);
    });
});

// addExercise(data) (public/api.js line 13)
// uses current document to update
router.put('/api/workouts/:id', (req, res) => {
  // findIdAndUpdate: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  db.Workout.findOneAndUpdate({ _id: req.params.id }, {
    // totalDuration display
    $inc: { 
      totalDuration: req.body.duration 
    },
    // send
    $push: {
      exercises: req.body
    }
  })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    // error otherwise
    .catch((err) => {
      res.status(400).json(err);
    });
});

// createWorkout(data = {}) (public/api.js line 26)
router.post('/api/workouts', ({ body }, res) => {
  db.Workout.create({ body })
    // creating newWorkout document for new info 
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      // error otherwise
      res.status(400).json(err);
    });
});

// getWorkoutsInRange() (public/api.js line 38)
router.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    // .sort({ date: -1 })
    // .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    // error otherwise
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;