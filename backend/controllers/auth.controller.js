const authService = require('../services/auth.service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api.error');

class AuthController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {name, email, password, roles} = req.body;
            const userData = await authService.signup(name, email, password, roles);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async signin(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.signin(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async signout(req, res, next) {
        try {
            const {refreshToken} = req.body;
            const token = await authService.signout(refreshToken);
            res.clearCookie('refreshToken')
            res.json(token);
        }
        catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }
        catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();