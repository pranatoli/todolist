const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')
const { getConnect, getDb } = require("../config/db");

class RegisterServices {
    async registration(body) {
        const client = await getConnect();
        const db = await getDb(client);
        const users = await db.collection('users').find({}).toArray();
        let data;
        if (users.length == 0) { // добавляем пользователя если массив пуст
            const newUser = RegisterServices.makeUser(body);
            data = await db.collection('users').insertOne(newUser);
        } else {//проверяем на наличие зарегистрированного пользователя с переданным email
            let findUser = users.filter(item => item.email == body.email);
            if (findUser == 0) {
                const newUser = RegisterServices.makeUser(body);
                data = await db.collection('users').insertOne(newUser);
            } else return { status: 400, send: "user with this email is registered" }
        }
        const returnUser = await db.collection('users') // ищем созданного пользователя по email и возкращаем его
            .find({ "email": body.email })
            .toArray();
        client.close();
        returnUser.map(item => item.password = body.password) // скрываем хэшированный пароль и возвращаем введенный пользователем
        // console.log(returnUser);
        return { status: 200, send: returnUser };
    }
    static makeUser(data) {
        const { username, email, password, gender, age } = data;
        const hashPassword = bcrypt.hashSync(password, 3);
        // console.log("hash" + hashPassword);
        const dataUser = { username, email, password: hashPassword, gender, age, tasks: [] };
        return dataUser;
    }
}

module.exports = new RegisterServices();