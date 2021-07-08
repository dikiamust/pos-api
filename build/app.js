"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const db_1 = __importDefault(require("./configs/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        dotenv_1.default.config();
        this.app = express_1.default();
        this.plugin();
        this.cors();
        this.route();
    }
    plugin() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        db_1.default();
    }
    cors() {
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(cors_1.default());
    }
    route() {
        this.app.use(indexRouter_1.default);
    }
}
exports.default = new App().app;
