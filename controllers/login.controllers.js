const { validationResult } = require('express-validator');
const LoginServices = require('../services/login.services');

class LoginController {
    async loginUser(req, res) {
        try {
            const result = validationResult(req);
            console.log("req.body" + req.body);
            if (result.isEmpty()) {
                const user = await LoginServices.loginServices(req.body);
                res.status(user.status).send(user.send)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            // подключить Sentry
        }
    }
}

module.exports = new LoginController();