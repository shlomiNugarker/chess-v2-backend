"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const authRoutes_1 = __importDefault(require("./api/auth/authRoutes"));
const userRoutes_1 = __importDefault(require("./api/user/userRoutes"));
const gameRoutes_1 = __importDefault(require("./api/game/gameRoutes"));
const chatRoutes_1 = __importDefault(require("./api/chat/chatRoutes"));
const socketService_1 = __importDefault(require("./services/socketService"));
const app = (0, express_1.default)();
const http = require('http').createServer(app);
const session = (0, express_session_1.default)({
    secret: 'secret session',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});
app.use(session);
app.use((0, body_parser_1.json)());
app.use(express_1.default.static('public'));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
app.use('/api/auth', authRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/game', gameRoutes_1.default);
app.use('/api/chat', chatRoutes_1.default);
socketService_1.default.connectSockets(http, session);
app.get('/**', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 3030;
http.listen(PORT, () => {
    console.log(`⚡️Server is running on port: ${PORT}`);
    (() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('dsdf');
        // const res = await fetch(
        //   'https://gw.yad2.co.il/feed-search-legacy/products/furniture?category=2&item=320&forceLdLoad=true'
        // )
        // const json = await res.json()
        // console.log(json.data.feed)
        const res = yield fetch('https://gw.yad2.co.il/feed-search-legacy/products/furniture?category=2&item=320&forceLdLoad=true');
        const json = yield res.json();
        // console.log(json.data.feed)
    }))();
});
