const UserModel    = require('../models/user.model');
const RoleModel    = require('../models/role.model');
const bcrypt       = require('bcrypt');
const uuid         = require('uuid');
const mailService  = require('./mail.service');
const tokenService = require('./token.service');
const UserDto      = require('../dtos/user.dto');
const ApiError     = require('../exeptions/api.error');

class AuthService {
    async signup(name, email, password, roles) {
        const candidate = await UserModel.findOne({email});
        if(candidate) {
            throw ApiError.BadRequest(`User with this email ${email} allready exist`);
        }

        const rolesData = await RoleModel.find({name: { $in: roles }});

        const hashPassword = await bcrypt.hash(password,3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({name, email, password: hashPassword, activationLink, roles: rolesData.map(role => role._id) });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest('Activation link is not correct');
        }
        user.isActivated = true;
        await user.save();
    }

    async signin(email, password) {
        const user = await UserModel.findOne({email})
        if(!user) {
            throw ApiError.BadRequest(`User with email ${email} does not exist`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Password is not correct');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async signout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService();