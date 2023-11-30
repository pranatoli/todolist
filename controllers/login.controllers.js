const { validationResult } = require('express-validator');
const LoginServices = require('../services/login.services');
const Sentry = require("@sentry/node");


class LoginController {
    async loginUser(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const user = await LoginServices.login(req.body);
                res.status(user.status).send(user.send)
            } else {
                res.send({
                    errors: result.array()
                })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }
}

module.exports = new LoginController();