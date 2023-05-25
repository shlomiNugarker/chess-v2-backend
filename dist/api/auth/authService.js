"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = __importDefault(require("../user/userService"));
exports.default = {
    signup,
    login,
};
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userService_1.default.getByUsername(username);
        if (!user)
            return Promise.reject('Invalid username or password');
        // TODO: un-comment for real login
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return Promise.reject('Invalid username or password');
        delete user.password;
        return user;
    });
}
function signup(username, password, fullname) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10;
        if (!username || !password || !fullname)
            return Promise.reject('fullname, username and password are required!');
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        return userService_1.default.add({ username, password: hash, fullname });
    });
}
