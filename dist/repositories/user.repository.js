"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    async create(data) {
        return await User_1.User.create(data);
    }
}
exports.userRepository = new UserRepository();
