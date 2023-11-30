const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 5,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 8,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 2,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        maxlength: 3,
        minlength: 1,
        trim: true,
    },
    tasks: {
        type: Array,
    },
},
    { versionKey: false })

module.exports = mongoose.model('User', userSchema, 'users')