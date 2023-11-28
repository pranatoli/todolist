const fs = require('fs');
const { getConnect, getDb } = require("../config/db");

class UserServices {
    async getUsers() {
        const client = await getConnect();
        const db = await getDb(client);
        const data = await db
            .collection('users')
            .find({})
            .toArray();
        client.close();
        return data;
    }
}

module.exports = new UserServices();