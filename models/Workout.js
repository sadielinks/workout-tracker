// built with https://mongoosejs.com/docs/guide.html

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose virtuals https://mongoosejs.com/docs/tutorials/virtuals.html
const opts = { toJSON: { virtuals: true } };

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now,
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true
                },
                name: {
                    type: String,
                    trim: true
                },
                duration: {
                    type: Number
                },
                weight: {
                    type: Number,
                    trim: true
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
            }
        ]
}
)