const { error } = require('console');
const fs = require('fs');
const { getConnect, getDb } = require("../config/db");
const { ObjectId } = require('mongodb');

class ToDosServices {
    async getTasksUser(id) {
        const client = await getConnect();
        const db = await getDb(client);
        const userTasks = await db.collection("tasks").find({ "idUser": id }).toArray();
        if (userTasks.length == 0) {
            client.close();
            return { status: 200, send: "this user has no tasks" }
        };
        client.close();
        return { status: 200, send: userTasks };
    }

    async createTask(id, body) {
        const client = await getConnect();
        const db = await getDb(client);
        const objTask = {
            title: body.title,
            isComplite: false,
            idUser: id,
        };
        await db.collection("tasks").insertOne(objTask);
        const tasks = await db.collection("tasks").find().toArray();
        const returnTask = tasks.at(-1);
        client.close();
        return { status: 200, send: returnTask };
    }

    async updateTitleTask(id, req) {
        const client = await getConnect();
        const db = await getDb(client);
        const idTask = req.params.id;
        const task = await db.collection("tasks").findOne({ "_id": new ObjectId(idTask) });
        if (!task) {
            client.close();
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            await db.collection("tasks").updateOne({ _id: new ObjectId(idTask) }, { $set: { "title": req.body.title } });
            const returnTask = await db.collection("tasks").findOne({ _id: new ObjectId(idTask) });
            client.close();
            return { status: 200, send: returnTask }
        } else {
            client.close();
            return { status: 400, send: 'this not your task' }
        };
    }

    async isCompletedTask(id, req) {
        const client = await getConnect();
        const db = await getDb(client);
        const idTask = req.params.id;
        const task = await db.collection("tasks").findOne({ "_id": new ObjectId(idTask) });
        if (!task) {
            client.close();
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            const status = !task.isComplite;
            await db.collection("tasks").updateOne({ _id: new ObjectId(idTask) }, { $set: { "isComplite": status } });
            const returnTask = await db.collection("tasks").findOne({ _id: new ObjectId(idTask) });
            client.close();
            return { status: 200, send: returnTask }
        } else {
            client.close();
            return { status: 400, send: 'this not your task' }
        };
    }

    async deleteTask(id, req) {
        const client = await getConnect();
        const db = await getDb(client);
        const idTask = req.params.id;
        console.log(id);
        const task = await db.collection("tasks").findOne({ "_id": new ObjectId(idTask) });
        console.log(task.idUser);
        if (!task) {
            client.close();
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            await db.collection("tasks").deleteOne({ _id: new ObjectId(idTask) });
            client.close();
            return { status: 200, send: "task is deleted" }
        } else {
            client.close();
            return { status: 400, send: 'this not your task' }
        };
    }
}

module.exports = new ToDosServices();