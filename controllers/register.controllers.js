const { validationResult } = require('express-validator');
const RegisterServices = require('../services/register.services');

class RegisterController {
    async registerUser(req, res) {
        console.log('enter in controllers');
        try {
            console.log('try/catch work');
            const result = validationResult(req);
            console.log("req.body" + req.body);
            if (result.isEmpty()) {
                const user = await RegisterServices.registerUser(req.body);
                res.status(user.status).send(user.send)
            } else {
                res.send({
                    errors: result.array()
                })
            }

        } catch (error) {
            // require sentry
        }
    }
}

module.exports = new RegisterController();