require('dotenv').config();

let express = require('express');
const router = express.Router();
const RegisterControllers = require('../controllers/register.controllers');

const { body, query, param, matchedData, validationResult } = require('express-validator');

const validationBody = [
    body('username').notEmpty().isString().trim().escape(),
    body('email').notEmpty().isString().isEmail().withMessage('Not a valid e-mail address').escape(),
    body('password').notEmpty().isString().trim().escape().isLength({ min: 8 }),
    body('gender').notEmpty().isString().trim().escape(),
    body('age').notEmpty().isInt().isLength({ max: 3 }),
];

/**
 * @swagger
 *  /api/register:
 *      post:
 *        tags: 
 *            - User
 *        summary:
 *           Add new user and return object/user 
 *        description:
 *            Add new user 
 *        requestBody:
 *          $ref: "#/components/requestBodies/User"
 *        responses:
 *          200: 
 *            description: A successful response, user created, retrn new object
 *          400:
 *            description: Email is already in use
 * components:
 *    requestBodies:
 *      User:
 *        description: User object
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  example: Klen
 *                  description: Username
 *                email: 
 *                  type: string
 *                  example: klen@rambler.com
 *                  description: User email
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r_
 *                  description: User password 
 *                gender: 
 *                  type: string
 *                  example: male
 *                  description: User gender
 *                age:
 *                  type: integer
 *                  example: 30
 *                  description: User age
 */
router.post('/', validationBody, RegisterControllers.registerUser)


module.exports = router;