"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameController_1 = __importDefault(require("./gameController"));
const router = express_1.default.Router();
router.get('/:id', gameController_1.default.getStateById);
router.put('/:id', gameController_1.default.updateState);
router.post('/', gameController_1.default.addState);
exports.default = router;
