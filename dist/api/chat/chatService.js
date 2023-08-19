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
const mongodb_1 = require("mongodb");
exports.default = {
    getById,
    add,
    update,
};
function getById(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection('chat');
            const chat = collection.findOne({ _id: new mongodb_1.ObjectId(chatId) });
            return chat;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
function add(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chatToAdd = Object.assign({}, chat);
            const collection = yield dbService_1.default.getCollection('chat');
            const { insertedId } = yield collection.insertOne(chatToAdd);
            return insertedId;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
function update(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var id = new mongodb_1.ObjectId(chat._id);
            delete chat._id;
            const collection = yield dbService_1.default.getCollection('chat');
            yield collection.updateOne({ _id: id }, { $set: Object.assign({}, chat) });
            const savedChat = Object.assign(Object.assign({}, chat), { _id: id });
            return savedChat;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if ('userId' in filterBy) {
        criteria.userId = filterBy.userId;
    }
    return criteria;
}
