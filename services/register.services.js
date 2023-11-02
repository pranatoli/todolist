const { error } = require('console');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')

class RegisterServices {
    registration(req) {
        return new Promise((res, rej) => {
            fs.readFile('data/users.json', 'utf8', (error, data) => {
                if (error) throw error;
                const users = JSON.parse(data);
                // console.log(users);
                if (users.length == 0) { // добавляем пользователя если массив пуст
                    let user = RegisterServices.makeUser(req);
                    users.push(user);
                } else { //проверяем на наличие зарегистрированного пользователя с переданным email
                    let filtredUsers = users.filter(item => item.email == req.email)
                    if (filtredUsers == 0) {
                        let user = RegisterServices.makeUser(req);
                        users.push(user);
                    } else res({ status: 400, send: "user with this email is registered" })
                }
                fs.writeFile('data/users.json', JSON.stringify(users), (error) => {
                    if (error) throw error;
                });
                let newUser = users[users.length - 1];
                res({ status: 200, send: newUser });
            })
        })
    }
    static makeUser(data) {
        let userID = RegisterServices.makeId();
        // const userID = this.generateUUID();
        const { username, email, password, gender, age } = data;
        const hashPassword = bcrypt.hashSync(password, 3);
        console.log("hash" + hashPassword);
        const dataUser = { id: userID, username, email, password: hashPassword, gender, age, tasks: [] };
        return dataUser;
    }

    // static generateUUID() {
    //     return uuidv4();
    // }

    static makeId() {
        let array = fs.readFileSync('data/users.json', { encoding: "utf-8" });
        let lastId = (JSON.parse(array)).length + 1;
        return lastId;
    }
}

module.exports = new RegisterServices();