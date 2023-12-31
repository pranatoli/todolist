const UserServices = require('../services/users.services');
const Sentry = require("@sentry/node");


class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserServices.getUsers();
            res.status(200).send(users)
        } catch (error) {
            Sentry.captureException(error);
            res.send('error: ' + error.message);
        }
    }
}

module.exports = new UserController();