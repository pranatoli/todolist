const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 1000,
        minlength: 2,
        trim: true,
    },
    isComplite: {
        type: Boolean,
        required: true,
        trim: true,
    },
    idUser: {
        type: String,
    },
},
    { versionKey: false })

module.exports = mongoose.model('Task', taskSchema, 'tasks')