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
const dbService_1 = __importDefault(require("../../services/dbService"));
const ObjectId = require('mongodb').ObjectId;
exports.default = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
};
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = _buildCriteria(filterBy);
            const collection = yield dbService_1.default.getCollection('user');
            var users = yield collection.find(criteria).toArray();
            users = users.map((user) => {
                delete user.password;
                return user;
            });
            return users;
        }
        catch (err) {
            console.log('cannot find users', err);
            throw err;
        }
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection('user');
            const user = yield collection.findOne({ _id: ObjectId(userId) });
            delete user.password;
            return user;
        }
        catch (err) {
            console.log(`while finding user ${userId}`, err);
            throw err;
        }
    });
}
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection('user');
            const user = yield collection.findOne({ username });
            return user;
        }
        catch (err) {
            console.log(`while finding user ${username}`, err);
            throw err;
        }
    });
}
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection('user');
            yield collection.deleteOne({ _id: ObjectId(userId) });
        }
        catch (err) {
            console.log(`cannot remove user ${userId}`, err);
            throw err;
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            const userToSave = Object.assign(Object.assign({}, user), { _id: ObjectId(user._id) });
            const collection = yield dbService_1.default.getCollection('user');
            yield collection.updateOne({ _id: userToSave._id }, { $set: userToSave });
            return userToSave;
        }
        catch (err) {
            console.log(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
function add(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // peek only updatable fields!
            // const userToAdd = {
            //   username: user.username,
            //   password: user.password,
            //   fullname: user.fullname,
            // }
            const collection = yield dbService_1.default.getCollection('user');
            yield collection.insertOne(user);
            // await collection.insertOne(userToAdd)
            return user;
        }
        catch (err) {
            console.log('cannot insert user', err);
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    // if (filterBy.txt) {
    //   const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    //   criteria.$or = [
    //     {
    //       username: txtCriteria,
    //     },
    //     {
    //       fullname: txtCriteria,
    //     },
    //   ]
    // }
    // // filter by position - if exists
    // // if (filterBy.position) {
    // //   criteria.position = { $exists: true }
    // // }
    // if (filterBy.position) {
    //   criteria.$and = [
    //     { 'position.lat': { $exists: true } },
    //     { 'position.lng': { $exists: true } },
    //   ]
    // }
    return criteria;
}
