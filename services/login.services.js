const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnect, getDb } = require("../config/db");

class LoginServices {
    async login(req) {
        const { email, password } = req;
        const client = await getConnect();
        const db = await getDb(client);
        const user = await db.collection("users").find({ "email": email }).toArray(); // поиск пользователя с переданным email
        if (user.length != 0) {
            const isPassEquals = bcrypt.compareSync(password, user[0].password);
            if (isPassEquals) {
                const token = jwt.sign({ id: user[0]._id, email: email }, process.env.ACCESS_TOKEN_SECRET, { noTimestamp: true });
                client.close();
                return { status: 200, send: token }; // пользователь найден, пароль совпадает, вернуть токен
            } else {// пользователь найден, пароль не совпадает
                client.close();
                return { status: 400, send: 'incorrect password' };
            }
        } else {// пользователя с таким email не существует
            client.close();
            return { status: 400, send: 'User with such an email is not registered' };
        }
    }
}

module.exports = new LoginServices();