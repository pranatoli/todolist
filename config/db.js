require('dotenv').config();
const url = process.env.MONGOOSEBDURL;
const mongoose = require('mongoose');

async function db() {
    mongoose.connect(url)
        .then(() => console.log('Mongoose is connected'))
}

module.exports = {
    db,
}