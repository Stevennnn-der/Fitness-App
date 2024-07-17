const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    workoutDate: String,
    numRow: Number,
    numCol: Number,
    bodyPart: [],
    data: [{
        action: String,
        sets: [String],
    }]
});

// const WorkoutTable = mongoose.model('WorkoutTable', workoutSchema);

module.exports = workoutSchema;