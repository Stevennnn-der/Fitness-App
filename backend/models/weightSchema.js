const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    weightDate: String,
    weightInKg: Number,
});

// const WorkoutTable = mongoose.model('WorkoutTable', workoutSchema);

module.exports = weightSchema;