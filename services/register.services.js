const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

class RegisterServices {
    async registration(body) {
        const newUser = RegisterServices.makeUser(body);
        const data = await new User(newUser);
        data.save();
        const returnUser = await User.find({ email: body.email }) // ищем созданного пользователя по email и возкращаем его
        returnUser.map(item => item.password = body.password) // скрываем хэшированный пароль и возвращаем введенный пользователем
        return { status: 200, send: returnUser };
    }
    static makeUser(data) {
        const { username, email, password, gender, age } = data;
        const hashPassword = bcrypt.hashSync(password, 3);
        const dataUser = { username, email, password: hashPassword, gender, age };
        return dataUser;
    }
}

module.exports = new RegisterServices();