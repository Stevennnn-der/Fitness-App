const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    sleepDate: String,
    sleepStartTime: String,
    sleepEndTime: String,
});

// const WorkoutTable = mongoose.model('WorkoutTable', workoutSchema);

module.exports = sleepSchema;