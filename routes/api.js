const router = require('express').Router();
const db = require('../models');

// using public/api.js to build following routes

// getLastWorkout() (public/api.js line 2)
router.get('/api/workouts/', (req, res) => {
 // sum aggregation + addFields: https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
    db.Workout.aggregate(
      [
        {
          $addFields: { 
              // based off of seed.js
              day: "$day",
              // 
              totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
});

// addExercise(data) (public/api.js line 13)
router.put('/api/workouts/:id', (req, res) => {
   // findIdAndUpdate + new:true return: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    db.Workout.findByIdAndUpdate({_id: req.params.id}, {
        // push to exercise array
        $push: {
            exercises: req.body
          }
    },
    {
      new: true
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// createWorkout(data = {}) (public/api.js line 26)
router.post('/api/workouts/', ({body}, res) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


// getWorkoutsInRange() (public/api.js line 38)
router.get('/api/workouts/range/', (req, res) => {
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