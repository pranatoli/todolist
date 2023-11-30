const { error } = require('console');
const fs = require('fs');
const { getConnect, getDb } = require("../config/db");
const { ObjectId } = require('mongodb');
const Task = require('../models/taskModel');

class ToDosServices {
    async getTasksUser(id) {
        const userTasks = await Task.find({ idUser: id });
        if (userTasks.length == 0) {
            return { status: 200, send: "this user has no tasks" }
        };
        return { status: 200, send: userTasks };
    }

    async createTask(id, body) {
        const objTask = {
            title: body.title,
            isComplite: false,
            idUser: id,
        };
        const addTask = new Task(objTask);
        await addTask.save();
        const tasks = await Task.find();
        const returnTask = tasks.at(-1);
        return { status: 200, send: returnTask };
    }

    async updateTitleTask(id, req) {
        const idTask = req.params.id;
        const task = await Task.findById(idTask);
        if (!task) {
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            const updateTask = await Task.findByIdAndUpdate(idTask, { title: req.body.title }, { new: true });
            return { status: 200, send: updateTask }
        } else {
            client.close();
            return { status: 400, send: 'this not your task' }
        };
    }

    async isCompletedTask(id, req) {
        const idTask = req.params.id;
        const task = await Task.findById(idTask);
        if (!task) {
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            const status = !task.isComplite;
            const updateTask = await Task.findByIdAndUpdate(idTask, { isComplite: status }, { new: true });
            return { status: 200, send: updateTask }
        } else {
            client.close();
            return { status: 400, send: 'this not your task' }
        };
    }

    async deleteTask(id, req) {
        const idTask = req.params.id;
        const task = await Task.findById(idTask);
        if (!task) {
            return { status: 404, send: 'task not found' }
        } else if (task.idUser == id) {
            await Task.findByIdAndDelete(idTask);
            return { status: 200, send: "task is deleted" }
        } else {
            return { status: 400, send: 'this not your task' }
        };
    }
}

module.exports = new ToDosServices();