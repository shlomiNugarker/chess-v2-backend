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
const userService_1 = __importDefault(require("./userService"));
exports.default = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addUser,
};
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userService_1.default.getById(req.params.id);
            res.send(user);
        }
        catch (err) {
            console.log('Failed to get user', err);
            res.status(500).send({ err: 'Failed to get user' });
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = req.query;
            const users = yield userService_1.default.query(filterBy);
            res.send(users);
        }
        catch (err) {
            console.log('Failed to get users', err);
            res.status(500).send({ err: 'Failed to get users' });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield userService_1.default.remove(req.params.id);
            res.send({ msg: 'Deleted successfully' });
        }
        catch (err) {
            console.log('Failed to delete user', err);
            res.status(500).send({ err: 'Failed to delete user' });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield userService_1.default.update(user);
            res.send(savedUser);
        }
        catch (err) {
            console.log('Failed to update user', err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const savedUser = yield userService_1.default.add(user);
            res.send(savedUser);
        }
        catch (err) {
            console.log('Failed to update user', err);
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
