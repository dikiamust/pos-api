"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class authController {
    static async login(req, res, next) {
        try {
            const reqEmail = await UserModel_1.User.findOne({ email: req.body.email });
            if (!reqEmail) {
                throw { name: "FALSE_LOGIN" };
            }
            const reqPassword = bcrypt_1.default.compareSync(req.body.password, reqEmail.password);
            if (!reqPassword) {
                throw { name: "FALSE_LOGIN" };
            }
            const key = process.env.SECRETKEY;
            let token = jwt.sign({ id: reqEmail.id, role: reqEmail.role }, key, {
                expiresIn: "1h",
            });
            res.status(200).json({
                message: "login successful!",
                data: reqEmail,
                access_token: token,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async forgetPassword(req, res, next) {
        try {
            const reqEmail = await UserModel_1.User.findOne({ email: req.body.email });
            if (!reqEmail) {
                throw { name: "NULL_EMAIL" };
            }
            const key = process.env.SECRETKEY;
            const token = jwt.sign({ id: reqEmail.id }, key, { expiresIn: "10m" });
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const templateEmail = {
                from: "'Owner Store8' <no-reply@gmail.com>",
                to: reqEmail.email,
                subject: ` Change Password Link `,
                html: `<p> To change your account's password, please click the link below </p><a href="${process.env.CLIENT_URL}auth/password/${reqEmail.id}/reset?token=${token}" target="_blank">${process.env.CLIENT_URL}auth/password/${reqEmail.id}/reset?token=${token}</a>`,
            };
            const sendMail = transporter.sendMail(templateEmail, (err, success) => {
                err ? console.log(err) : console.log("success " + success);
            });
            res.status(200).json({
                message: "link sent successfully, please check your email!",
                data: reqEmail,
            });
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    }
    static async resetPassword(req, res, next) {
        try {
            const reqNewPass = req.body.password;
            const token = req.query.token;
            const reqId = req.params.userId;
            if (!reqNewPass) {
                throw { name: "NULL_PASS" };
            }
            if (!reqId) {
                throw { name: "NULL_ID" };
            }
            if (!token) {
                throw { name: "NULL_TOKEN" };
            }
            const key = process.env.SECRETKEY;
            const decoded = jwt.verify(token, key);
            if (reqId === decoded.id) {
                const newPass = await UserModel_1.User.findByIdAndUpdate(reqId, { password: bcrypt_1.default.hashSync(reqNewPass, 8) }, { new: true });
                res.status(200).json({
                    success: true,
                    message: "Password has been successfully reset!",
                    data: newPass,
                });
            }
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = authController;
