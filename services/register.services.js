const { error } = require('console');
const fs = require('fs')

class RegisterServices {
    registerUser(req) {
        console.log("services work");
        console.log(req);
        return new Promise((res, rej) => {
            fs.readFile('data/users.json', 'utf8', (error, data) => {
                if (error) throw error;
                const users = JSON.parse(data);
                console.log(users);
                if (users.length == 0) { // добавляем пользователя если массив пуст
                    users.push(makeUser(req));
                } else { //проверяем на наличие зарегистрированного пользователя с переданным email
                    let filtredUsers = users.filter(item => item.email == req.email)
                    if (filtredUsers == 0) {
                        users.push(makeUser(req));
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
}

function makeUser(dataUser) {
    let userID = makeId();
    // console.log('userID: ' + userID);
    dataUser = { ...dataUser, id: userID, tasks: [] }
    return dataUser;
}

function makeId() {
    let array = fs.readFileSync('data/users.json', { encoding: "utf-8" });
    let lastId = (JSON.parse(array)).length + 1;
    // console.log('lastId ' + lastId);
    return lastId;
}

module.exports = new RegisterServices();