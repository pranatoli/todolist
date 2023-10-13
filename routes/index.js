let express = require('express');
const router = express.Router();
const loginUser = require('./login.routes');
const registerUser = require('./register.routes');
const todos = require('./todos.routes');

router.use('/todos', todos);
router.use('/login', loginUser);
router.use('/register', registerUser);

module.exports = router;
