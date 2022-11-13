"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./api/auth/authRoutes"));
const userRoutes_1 = __importDefault(require("./api/user/userRoutes"));
const gameRoutes_1 = __importDefault(require("./api/game/gameRoutes"));
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
socketService_1.default.connectSockets(http, session);
app.get('/**', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 3030;
http.listen(PORT, () => {
    console.log(`⚡️Server is running on port: http://localhost:${PORT}`);
});
