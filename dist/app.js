"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app = (0, express_1.default)();
//app.use(paperGameRoutes);
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/games?retryWrites=true&w=majority`)
    .then((result) => {
    const server = app.listen(8080);
    console.log("running1");
})
    .catch((err) => console.log(err));
