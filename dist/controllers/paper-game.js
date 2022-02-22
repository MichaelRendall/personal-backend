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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
const game_1 = __importDefault(require("../models/game"));
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomName = req.body.text;
    const newGame = new game_1.default(roomName);
    try {
        yield newGame.save();
        res.status(201).json({
            message: "Game created successfully!",
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createGame = createGame;
