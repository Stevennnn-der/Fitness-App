const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
    sleepDate: String,
    sleepStartTime: String,
    sleepEndTime: String,
});

module.exports = sleepSchema;