const { validationResult } = require('express-validator');
const RegisterServices = require('../services/register.services');
const Sentry = require("@sentry/node");

class RegisterController {
    async registerUser(req, res) {
        console.log('enter in controllers');
        try {
            console.log('try/catch work');
            const result = validationResult(req);
            console.log("req.body" + req.body);
            if (result.isEmpty()) {
                const user = await RegisterServices.registration(req.body);
                res.status(user.status).send(user.send)
            } else {
                res.status(400),
                    res.send({
                        errors: result.array()
                    })
            }
        } catch (error) {
            Sentry.captureException(error);
        }
    }
}

module.exports = new RegisterController();