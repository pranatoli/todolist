const { validationResult } = require('express-validator');
const RegisterServices = require('../services/register.services');
const Sentry = require("@sentry/node");
const User = require('../models/userModel');

class RegisterController {
    async registerUser(req, res) {
        try {
            const result = validationResult(req);
            if (result.isEmpty()) {
                const body = req.body;
                const users = await User.find({});
                let user;
                if (users.length == 0) {
                    user = await RegisterServices.registration(body);
                } else {
                    let findUser = users.filter(item => item.email == body.email);
                    if (findUser == 0) {
                        user = await RegisterServices.registration(body);
                    } else {
                        res.status(400).send("user with this email is registered");
                    }
                }
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