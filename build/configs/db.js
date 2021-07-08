"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
class mongoDB {
    constructor() {
        dotenv_1.default.config();
    }
    connect() {
        const pathURI = process.env.DB_HOST;
        const connectOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(pathURI, connectOption, () => {
            console.log("connected to database");
        });
    }
}
exports.default = new mongoDB().connect;
