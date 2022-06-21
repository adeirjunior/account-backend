"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const routes_1 = require("./routes");
const db_1 = __importDefault(require("./db"));
(0, dotenv_1.config)({ path: './.env' });
const app = (0, express_1.default)();
const PORT = 3001;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000'], methods: ['POST', 'GET'] }));
app.use('/api/user', routes_1.userApi);
app.use((0, helmet_1.default)());
(0, db_1.default)(process.env.DATABASE);
app.listen(PORT, () => {
    console.log(`☀ [server]: Running a Express API server at http://localhost:${PORT}/api/user`);
});
