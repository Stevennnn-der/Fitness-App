const mongoose = require('mongoose');

const weightSchema = new mongoose.Schema({
    weightDate: String,
    weightInKg: Number,
});

module.exports = weightSchema;