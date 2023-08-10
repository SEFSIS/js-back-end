"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("../constants");
const user_enum_1 = require("../enums/user.enum");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.firstName = joi_1.default.string().min(3).max(30).trim();
UserValidator.age = joi_1.default.number().min(18).max(199);
UserValidator.gender = joi_1.default.valid(...Object.values(user_enum_1.Genders));
UserValidator.email = joi_1.default.string()
    .regex(constants_1.regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
    "string.empty": "Це поле обов'язкове",
    "string.email": "Адреса електронної пошти має неправильний формат",
});
UserValidator.password = joi_1.default.string().regex(constants_1.regexConstants.PASSWORD).trim();
UserValidator.create = joi_1.default.object({
    name: _a.firstName.required(),
    age: _a.age.required(),
    gender: _a.gender.required(),
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.update = joi_1.default.object({
    name: _a.firstName,
    age: _a.age,
    gender: _a.gender,
});
UserValidator.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.changePassword = joi_1.default.object({
    oldPassword: _a.password.required(),
    newPassword: _a.password.required(),
});
UserValidator.forgotPassword = joi_1.default.object({
    email: _a.email.required(),
});
UserValidator.setForgotPassword = joi_1.default.object({
    password: _a.password.required(),
});
