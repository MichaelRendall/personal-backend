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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const express_validator_1 = require("express-validator");
const nodemailer_1 = require("nodemailer");
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new Error("Please fill in all the fields");
        }
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;
        const transporter = (0, nodemailer_1.createTransport)({
            service: "hotmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: { rejectUnauthorized: false },
        });
        // send mail with defined transport object
        yield transporter.sendMail({
            from: `"Michael Messages" <${process.env.EMAIL_USER}>`,
            to: "michaelrendallmail@gmail.com",
            subject: `New Message From ${name}`,
            text: `Name: ${name} Email: ${email} Message: ${message}`,
            html: `<p><b>Name</b>: ${name}</p><p><b>Email</b>: ${email}</p><p><b>Message</b>: ${message}</p>`, // html body
        });
        res.status(201).json({
            message: "message sent",
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.sendMessage = sendMessage;
