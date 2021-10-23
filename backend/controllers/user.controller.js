const userService = require('../services/user.service');

class UserController {
    async getUsers(res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();