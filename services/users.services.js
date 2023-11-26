const fs = require('fs');
const { getConnect, getDb } = require("../config/db")

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
    async getUserByDB() {
        return new Promise(async (res, rej) => {
            const client = await getConnect();
            const db = await getDb(client);
            const data = await db
                .collection('users')
                .find({})
                .toArray();
            client.close();
            res(data);
        })
    }
}

module.exports = new UserServices();