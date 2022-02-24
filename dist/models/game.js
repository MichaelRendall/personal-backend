"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    isHost: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const gameSchema = new Schema({
    room: {
        type: String,
        required: true,
    },
    users: [usersSchema],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Game", gameSchema);
