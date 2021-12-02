const router = require("express").Router();
const Workout = require("../models/Workout.js");

// using public/api.js to build following routes

// getLastWorkout() (public/api.js line 2)
router.get('/api/workouts', (req, res) => {
    Workout.find()
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

// addExercise(data) (public/api.js line 13)


// createWorkout(data = {}) (public/api.js line 26)


// getWorkoutsInRange() (public/api.js line 38)


module.exports = router;