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
exports.createSubmissions = exports.joinGame = exports.createGame = void 0;
const game_1 = __importDefault(require("../models/game"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const room = req.body.room;
    const name = req.body.name;
    const uuid = (0, uuid_1.v4)();
    const newGame = new game_1.default({
        room,
        users: [{ name: name, uuid: uuid, isHost: true }],
    });
    try {
        const result = yield newGame.save();
        res.status(201).json({
            message: "created game",
            uuid: uuid,
            name: name,
            roomId: result._id,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createGame = createGame;
const joinGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.joinGame = joinGame;
const createSubmissions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //const submissions = (req.body as { room: string }).room;
    const submissions = req.body;
    res
        .status(201)
        .json({ message: "created submissions", submissions: submissions });
    /* const newSubmission = new Submission({ submissions });
  
    try {
      await newGame.save();
  
      res.status(201).json({ message: "created game", room: room });
    } catch (err) {
      console.log(err);
    } */
});
exports.createSubmissions = createSubmissions;
