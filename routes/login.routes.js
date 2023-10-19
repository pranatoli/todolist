require('dotenv').config();

let express = require('express');
const router = express.Router();
const LoginControllers = require('../controllers/login.controllers');

const { body, query, param, matchedData, validationResult } = require('express-validator');

const validationBody = [
    body('email').notEmpty().isString().isEmail().withMessage('Not a valid e-mail address').escape(),
    body('password').notEmpty().isString().trim().escape().isLength({ min: 8 }),
];

/**
 * @swagger
 *  /api/login:
 *      post:
 *        tags: 
 *            - Login
 *        summary:
 *            Checks if such user exist in system, checks password and return JWT token if everything is OK 
 *        description:
 *            Check email and password 
 *        requestBody:
 *          $ref: "#/components/requestBodies/UserLogin"
 *        responses:
 *          200: 
 *            description: A successful response, user created, retrn new object
 *          400:
 *            description: Email is already in use
 * components:
 *    requestBodies:
 *      UserLogin:
 *        description: Users email and password
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email: 
 *                  type: string
 *                  example: klen@rambler.com
 *                  description: User email
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r_
 *                  description: User password 
 */
router.post('/', LoginControllers.loginUser)

module.exports = router;
