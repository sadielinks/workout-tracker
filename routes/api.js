const router = require('express').Router();
const Workout = require('../models/Workout');

// using public/api.js to build following routes

// getLastWorkout() (public/api.js line 2)
router.get('/api/workouts', (req, res) => {
 // https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
    Workout.aggregate()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// addExercise(data) (public/api.js line 13)
router.put('/api/workout/:id', (req, res) => {
\    // https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    Workout.findByIdAndUpdate(req.params.id, {
        // push to exercise array
        $push: {
            exercises: req.body
          }
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// createWorkout(data = {}) (public/api.js line 26)
router.post('/api/workouts', (req, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


// getWorkoutsInRange() (public/api.js line 38)
router.get('/api/workout/range', (req, res) => {
    Workout.find({})
    .sort('-day')
    .limit(7)
      .then(dbWorkout => {
        console.log(dbWorkout);
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;