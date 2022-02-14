const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true, //create fields for what was created and when was modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;
