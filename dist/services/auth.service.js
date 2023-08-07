"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const email_enum_1 = require("../enums/email.enum");
const errors_1 = require("../errors");
const OldPassword_model_1 = require("../models/OldPassword.model");
const Token_model_1 = require("../models/Token.model");
const User_1 = require("../models/User");
const email_service_1 = require("./email.service");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
class AuthService {
    async register(data) {
        try {
            const hashedPassword = await password_service_1.passwordService.hash(data.password);
            await User_1.User.create({ ...data, password: hashedPassword });
            await email_service_1.emailService.sendMail(data.email, email_enum_1.EEmailActions.WELCOME, {
                name: data.name,
            });
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async login(credentials, user) {
        try {
            const isMatched = await password_service_1.passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Invalid email or password", 401);
            }
            const tokensPair = await token_service_1.tokenService.generateTokenPair({
                _id: user._id,
                name: user.name,
            });
            await Token_model_1.Token.create({
                ...tokensPair,
                _userId: user._id,
            });
            return tokensPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async refresh(oldTokensPair, tokenPayload) {
        try {
            const tokensPair = await token_service_1.tokenService.generateTokenPair(tokenPayload);
            await Promise.all([
                Token_model_1.Token.create({ _userId: tokenPayload._id, ...tokensPair }),
                Token_model_1.Token.deleteOne({ refreshToken: oldTokensPair.refreshToken }),
            ]);
            return tokensPair;
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
    async changePassword(dto, userId) {
        try {
            const oldPasswords = await OldPassword_model_1.OldPassword.find({ _userId: userId });
            await Promise.all(oldPasswords.map(async ({ password: hash }) => {
                const isMatched = await password_service_1.passwordService.compare(dto.oldPassword, hash);
                if (isMatched) {
                    throw new errors_1.ApiError("Wrong old password", 400);
                }
            }));
            const user = await User_1.User.findById(userId).select("password");
            const isMatched = await password_service_1.passwordService.compare(dto.oldPassword, user.password);
            if (!isMatched) {
                throw new errors_1.ApiError("Wrong old password", 400);
            }
            const newHash = await password_service_1.passwordService.hash(dto.newPassword);
            await Promise.all([
                OldPassword_model_1.OldPassword.create({ password: user.password, _userId: userId }),
                await User_1.User.updateOne({ _id: userId }, { password: newHash }),
            ]);
        }
        catch (e) {
            throw new errors_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
