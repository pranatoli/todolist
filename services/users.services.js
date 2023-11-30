const fs = require('fs');
const User = require('../models/userModel');

class UserServices {
    async getUsers() {
        return await User.find({});
    }
}

module.exports = new UserServices();