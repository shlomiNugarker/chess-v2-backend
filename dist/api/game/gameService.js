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
const mongodb_1 = require("mongodb");
const dbService_1 = __importDefault(require("../../services/dbService"));
exports.default = {
    getById,
    add,
    update,
};
function getById(stateId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield dbService_1.default.getCollection('game');
            const state = collection.findOne({ _id: new mongodb_1.ObjectId(stateId) });
            return state;
        }
        catch (err) {
            console.log(`cant finding game getById ${stateId}`, err);
            throw err;
        }
    });
}
function add(state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stateToAdd = Object.assign(Object.assign({}, state), { createdAt: new Date().getTime() });
            const collection = yield dbService_1.default.getCollection('game');
            yield collection.insertOne(stateToAdd);
            return stateToAdd;
        }
        catch (err) {
            console.log(`cant add state `, err);
            throw err;
        }
    });
}
function update(state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var id = new mongodb_1.ObjectId(state._id);
            delete state._id;
            const collection = yield dbService_1.default.getCollection('game');
            yield collection.updateOne({ _id: id }, { $set: Object.assign({}, state) });
            const addedState = Object.assign(Object.assign({}, state), { _id: id });
            return addedState;
        }
        catch (err) {
            console.log(`cannot update post ${state._id}`, err);
            throw err;
        }
    });
}
