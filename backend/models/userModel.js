const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    email: {
        type: String,
        required: [true, 'Please Add the Email!'],
    },

    username: {
        type: String,
        required: [true, 'Please Add the Username!'],
    },
    
    password: {
        type: String,
        required: [true, "Please Add the User Password"],
    },
});

module.exports = mongoose.model('User', userSchema);
