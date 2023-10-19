require('dotenv').config();

let express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/users.controllers');


/**
 *@swagger
 *  /api/users:
 *    get:
 *      tags:
 *         - User
 *      summary: Get a list of registered users
 *      description: Get a list of registered users
 *      responses:
 *          200: 
 *            description: Get list users
 *          400:
 *            description: bad request
 * 
 */
router.get('/', UserControllers.getAllUsers);


module.exports = router;