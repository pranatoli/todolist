require('dotenv').config();

let express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/user.controllers');

// router.get('/', ToDosControllers.getToDos);

// router.post('/', ToDosControllers.addToDo);

// router.patch('/:id', ToDosControllers.updateTitleToDo);

// router.patch('/:id/isCompleted', ToDosControllers.isCompletedToDo);

// router.delete('/:id', ToDosControllers.deleteToDo);

module.exports = router;