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
router.get("/workouts/", (req, res) => {
  db.Workout.find({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// addExercise(data) (public/api.js line 13)
// uses current document to update
router.put('workouts/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  // findIdAndUpdate: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  db.Workout.findOneAndUpdate({ _id: id }, {
    $push: {
      exercises: body
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// 
router.put("/workouts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  db.Workout.findOneAndUpdate(
    { _id: id }, {
    $push: {
      exercises: body
    }
  },
  // findIdAndUpdate properties:
    { 
      new: true, 
      runValidators: true 
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// createWorkout(data = {}) (public/api.js line 26)
router.post('/api/workouts/', (req, res) => {
	db.Workout.create({})
  // creating newWorkout document for new info 
	  .then((createWorkout) => {
	    res.json(createWorkout);
	  })
	  .catch((err) => {
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