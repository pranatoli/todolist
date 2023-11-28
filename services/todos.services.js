const { error } = require('console');
const fs = require('fs');
const { getConnect, getDb } = require("../config/db");

class ToDosServices {
    async getTasksUser(id) {
        const client = await getConnect();
        const db = await getDb(client);
        const userTasks = await db.collection("tasks").find({ "idUser": id }).toArray();
        if (userTasks.length == 0) return { status: 200, send: "this user has no tasks" };
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
        }
        await db.collection("tasks").insertOne(objTask);
        const tasks = await db.collection("tasks").find().toArray();
        const returnTask = tasks.at(-1);
        client.close();
        return { status: 200, send: returnTask };
    }

    updateTitleTask(id, req) {
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const updateTask = tasks.map(item => item.id == req.params.id ? { ...item, title: req.body.title } : item);
                    fs.writeFile('data/tasks.json', JSON.stringify(updateTask), (error) => {
                        if (error) throw error;
                    });
                    const resTask = updateTask.find((item => item.id == req.params.id));
                    console.log(resTask);
                    res({ status: 200, send: resTask });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    isCompletedTask(id, req) {
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const updateTask = tasks.map(item => {
                        if (item.id == req.params.id) {
                            return { ...item, isComplite: !item.isComplite }
                        } else return item;
                    });
                    fs.writeFile('data/tasks.json', JSON.stringify(updateTask), (error) => {
                        if (error) throw error;
                    });
                    const resTask = updateTask.find((item => item.id == req.params.id));
                    res({ status: 200, send: resTask });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    deleteTask(id, req) {
        return new Promise((res, rej) => {
            fs.readFile('data/tasks.json', 'utf8', (error, data) => {
                if (error) throw error;
                const tasks = JSON.parse(data);
                const task = tasks.find(item => item.id == req.params.id);
                if (!task) {
                    res({ status: 404, send: 'task not found' });
                } else if (task.idUser == id) {
                    const id = tasks.findIndex(item => item.id == req.params.id);
                    console.log('ID task in array: ' + id);
                    tasks.splice(id, 1);
                    fs.writeFile('data/tasks.json', JSON.stringify(tasks), (error) => {
                        if (error) throw error;
                    });
                    res({ status: 200, send: 'task deleted' });
                } else res({ status: 400, send: 'this not your task' });
            })
        })
    }

    static makeId() {
        let array = fs.readFileSync('data/tasks.json', { encoding: "utf-8" });
        let lastId = (JSON.parse(array)).length + 1;
        return lastId;
    }

}

module.exports = new ToDosServices();