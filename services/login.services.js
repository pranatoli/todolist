const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class LoginServices {
    async login(req) {
        const { email, password } = req;
        const user = await User.find({ email: email }); // поиск пользователя с переданным email
        if (user.length != 0) {
            const isPassEquals = bcrypt.compareSync(password, user[0].password);
            if (isPassEquals) {
                const idUser = user[0]._id.toString();
                const token = jwt.sign({ id: idUser, email: email }, process.env.ACCESS_TOKEN_SECRET, { noTimestamp: true });
                return { status: 200, send: token }; // пользователь найден, пароль совпадает, вернуть токен
            } else {// пользователь найден, пароль не совпадает
                return { status: 400, send: 'incorrect password' };
            }
        } else {// пользователя с таким email не существует
            return { status: 400, send: 'User with such an email is not registered' };
        }
    }
}

module.exports = new LoginServices();