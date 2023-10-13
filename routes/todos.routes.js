require('dotenv').config();

let express = require('express');
const routes = express.Router();
const ToDosControllers = require('../controllers/todos.controller');

routes.get('/', ToDosControllers.getToDos);

routes.post('/', ToDosControllers.addToDo);

routes.patch('/:id', ToDosControllers.updateTitleToDo);

routes.patch('/:id/isCompleted', ToDosControllers.isCompletedToDo);

routes.delete('/:id', ToDosControllers.deleteToDo);

module.exports = routes;