"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const flagQuizSchema = new Schema({
    nickname: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    filters: { continent: { type: String, required: true } },
}, { timestamps: true });
exports.default = mongoose_1.default.model("FlagQuiz", flagQuizSchema);
