let express = require('express');
const router = express.Router();
const loginUser = require('./login.routes');
const registerUser = require('./register.routes');
const todos = require('./todos.routes');
const user = require('./user.routes');

router.use('/todos', todos);
router.use('/login', loginUser);
router.use('/register', registerUser);
router.use('/user', user)

module.exports = router;
