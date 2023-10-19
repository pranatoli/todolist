const UserServices = require('../services/users.services');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserServices.getAllUsers();
            res.status(users.status).send(users.send)
        } catch (error) {
            // require sentry
            res.send('error: ' + error.message);
        }
    }

    // async getUserById(req, res) {

    // }

    // async updateTitleToDo(req, res) {

    // }

    // async isCompletedToDo(req, res) {

    // }

    // async deleteToDo(req, res) {

    // }

}

module.exports = new UserController();