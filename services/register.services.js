const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

class RegisterServices {
    async registration(body) {
        const users = await User.find({});
        let data;
        if (users.length == 0) { // добавляем пользователя если массив пуст
            const newUser = RegisterServices.makeUser(body);
            data = await new User(newUser);
            data.save();
        } else {//проверяем на наличие зарегистрированного пользователя с переданным email
            let findUser = users.filter(item => item.email == body.email);
            if (findUser == 0) {
                const newUser = RegisterServices.makeUser(body);
                data = await new User(newUser);
                data.save();
            } else {
                return { status: 400, send: "user with this email is registered" };
            }
        }
        const returnUser = await User.find({ email: body.email }) // ищем созданного пользователя по email и возкращаем его
        returnUser.map(item => item.password = body.password) // скрываем хэшированный пароль и возвращаем введенный пользователем
        return { status: 200, send: returnUser };
    }
    static makeUser(data) {
        const { username, email, password, gender, age } = data;
        const hashPassword = bcrypt.hashSync(password, 3);
        const dataUser = { username, email, password: hashPassword, gender, age, tasks: [] };
        return dataUser;
    }
}

module.exports = new RegisterServices();