require('dotenv').config();

const { validationResult } = require('express-validator');
const ToDosServices = require('../services/todos.services');
const jwt = require('jsonwebtoken');
const Sentry = require("@sentry/node");

class ToDosController {
    async getToDos(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const userData = req.user;
                const user = await ToDosServices.getTasksUser(userData.id);
                res.status(user.status).send(user.send)
            } else {
                res.status(400);
                res.send({
                    errors: result.array()
                })
            }

        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async addToDo(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const userData = req.user;
                const task = await ToDosServices.createTask(userData.id, req.body);
                res.status(task.status).send(task.send)
            } else {
                res.status(400);
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async updateTitleToDo(req, res) {
        console.log('enter in ToDosController updateTitleToDo');
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const userData = req.user;
                const task = await ToDosServices.updateTitleTask(userData.id, req);
                res.status(task.status).send(task.send)
            } else {
                res.status(400);
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async isCompletedToDo(req, res) {
        console.log('enter in ToDosController isCompletedToDo');
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const userData = req.user;
                const task = await ToDosServices.isCompletedTask(userData.id, req);
                res.status(task.status).send(task.send)
            } else {
                res.status(400);
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async deleteToDo(req, res) {
        console.log('enter in ToDosController deleteToDo');
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const userData = req.user;
                const task = await ToDosServices.deleteTask(userData.id, req);
                res.status(task.status).send(task.send)
            } else {
                res.status(400);
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }
}

module.exports = new ToDosController();