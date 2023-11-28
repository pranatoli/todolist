require('dotenv').config();

let express = require('express');
const router = express.Router();
const ToDosControllers = require('../controllers/todos.controllers');
const jwt = require('jsonwebtoken');
const { body, query, param, matchedData, validationResult } = require('express-validator');
const Sentry = require('@sentry/node');
const { authenticateToken } = require('../helpers/helpers');

const validationBody = [
    body('title').notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage('the task must be at least 3 characters long')
        .escape()
];

const validationParamId = [
    param('id').notEmpty().isInt()
]

/**
 *@swagger
 *  /api/todos:
 *    get:
 *      tags:
 *         - ToDos
 *      security: [ { bearerAuth: [] } ]
 *      summary: Get a list user todos
 *      description: Get a list  user todos
 *      responses:
 *          200: 
 *            description: Get list users
 *          400:
 *            description: bad request
 * 
 */
router.get('/', authenticateToken, ToDosControllers.getToDos);
/**
 *@swagger
 *  /api/todos:
 *    post:
 *      tags:
 *         - ToDos
 *      security: [ { bearerAuth: [] } ]
 *      summary: Create task for user 
 *      description: create task for user by ID
 *      requestBody:
 *        $ref: "#/components/requestBodies/Task"
 *      responses:
 *          200: 
 *            description: Task created
 *          400:
 *            description: bad request
 * components:
 *    requestBodies:
 *      Task:
 *        description: User object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: купить молоко
 *                  description: Task title
 */
router.post('/', authenticateToken, validationBody, ToDosControllers.addToDo);
/**
 *@swagger
 *  /api/todos/{id}:
 *    patch:
 *      tags:
 *         - ToDos
 *      security: [ { bearerAuth: [] } ]
 *      summary: Update title task 
 *      description: Update title task by ID
 *      requestBody:
 *        $ref: "#/components/requestBodies/Task"
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID task that needs to be update
 *          required: true
 *      responses:
 *          200: 
 *            description: Title task is update
 *          400:
 *            description: bad request
 * components:
 *    requestBodies:
 *      Task:
 *        description: User object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: купить кефир
 *                  description: Task title
 */
router.patch('/:id', authenticateToken, validationBody, validationParamId, ToDosControllers.updateTitleToDo);
/**
 *@swagger
 *  /api/todos/{id}/isCompleted:
 *    patch:
 *      tags:
 *         - ToDos
 *      security: [ { bearerAuth: [] } ]
 *      summary: Update status task 
 *      description: Update status task by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID task that needs to be update
 *          required: true
 *      responses:
 *          200: 
 *            description: Status task is update
 *          400:
 *            description: bad request
 */
router.patch('/:id/isCompleted', authenticateToken, validationBody, validationParamId, ToDosControllers.isCompletedToDo);
/**
 *@swagger
 *  /api/todos/{id}:
 *    delete:
 *      tags:
 *         - ToDos
 *      security: [ { bearerAuth: [] } ]
 *      summary: Delete task 
 *      description: Delete task by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID task that needs to be delete
 *          required: true
 *      responses:
 *          200: 
 *            description: Task is delete
 *          400:
 *            description: bad request
 */
router.delete('/:id', authenticateToken, validationParamId, ToDosControllers.deleteToDo);

module.exports = router;