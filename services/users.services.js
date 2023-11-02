const fs = require('fs');

class UserServices {
    getAllUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data/users.json', 'utf8', (error, data) => {
                if (error) throw error;
                let users = JSON.parse(data);
                let resArr = users.map(item => {
                    delete item.password;
                    return item;
                })
                res({ status: 200, send: resArr });
            })
        })
    }
    getUserById() {

    }
}

module.exports = new UserServices();