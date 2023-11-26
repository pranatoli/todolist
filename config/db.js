require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGODBURL;
const client = new MongoClient(url);
const dbName = 'todos';

async function getConnect() {
    return MongoClient.connect(url).then(client);
}

async function getDb() {
    const db = await client.db(dbName);
    return db;
}

module.exports = {
    getConnect,
    getDb,
}