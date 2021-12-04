// built with https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                // resistance OR cardio
                type: {
                    type: String,
                    trim: true,
                    required: true
                },
                // resistance + cardio
                name: {
                    type: String,
                    required: true
                },
                // resistance + cardio
                duration: {
                    type: Number,
                    required: true
                },
                // resistance only
                weight: {
                    type: Number,
                },
                // resistance only
                reps: {
                    type: Number
                },
                // resistance only
                sets: {
                    type: Number
                },
                // cardio only
                distance: {
                    type: Number
                },

            },
        ],
},
);

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;