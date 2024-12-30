"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("./chatController"));
const router = express_1.default.Router();
router.get("/:id", chatController_1.default.getChatById);
router.post("/", chatController_1.default.addChat);
router.put("/:id", chatController_1.default.updateChat);
exports.default = router;
