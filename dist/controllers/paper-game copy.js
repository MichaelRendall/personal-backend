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
exports.createSubmissions = exports.getGame = exports.leaveGame = exports.joinGame = exports.createGame = void 0;
const game_1 = __importDefault(require("../models/game"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const createGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new Error("Please fill your name and the room code");
    }
    const room = req.body.room;
    const name = req.body.name;
    const uuid = (0, uuid_1.v4)();
    try {
        const roomExists = yield game_1.default.findOne({ room: room, active: true });
        if (roomExists) {
            throw new Error("This room already exists");
        }
        const newGame = new game_1.default({
            room,
            users: [{ name: name, uuid: uuid, isHost: true }],
        });
        const result = yield newGame.save();
        const socket = req.app.get("socket");
        socket.join(result._id.toString());
        console.log(`${name} created room ${result._id.toString()}`);
        res.status(201).json({
            message: "created game",
            uuid: uuid,
            name: name,
            roomId: result._id,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.createGame = createGame;
const joinGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new Error("Please fill your name and the room code");
    }
    const room = req.body.room;
    const name = req.body.name;
    const uuid = (0, uuid_1.v4)();
    try {
        const existingRoom = yield game_1.default.findOne({ room: room, active: true });
        if (!existingRoom) {
            throw new Error("Room does not exist");
        }
        existingRoom.users.push({ name: name, uuid: uuid });
        const result = yield existingRoom.save();
        const socket = req.app.get("socket");
        socket.join(existingRoom._id.toString());
        console.log(`${name} joined room ${existingRoom._id.toString()}`);
        socket.broadcast.to(existingRoom._id.toString()).emit("join-game", {
            message: "joined game",
            game: result,
        });
        res.status(201).json({
            message: "joined game",
            uuid: uuid,
            name: name,
            roomId: result._id,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.joinGame = joinGame;
const leaveGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new Error("A valid room and user must be set in order to leave");
    }
    const roomId = req.body.roomId;
    const uuid = req.body.uuid;
    try {
        const existingRoom = yield game_1.default.findById(roomId);
        if (!existingRoom) {
            throw new Error("Room does not exist");
        }
        const updatedUsers = existingRoom.users.filter((user) => user.uuid !== uuid);
        if (updatedUsers.length === 0) {
            existingRoom.active = false;
        }
        existingRoom.users = updatedUsers;
        yield existingRoom.save();
        const socket = req.app.get("socket");
        console.log(`user left room ${roomId}`);
        socket.leave(roomId.toString());
        socket.broadcast.to(roomId.toString()).emit("leave-game", {
            message: "left game",
            game: existingRoom,
        });
        res.status(201).json({
            message: "left game",
            removeData: true,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.leaveGame = leaveGame;
const getGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.roomId;
    try {
        const game = yield game_1.default.findById(roomId);
        if (!game) {
            throw new Error("Room does not exist");
        }
        res.status(200).json({
            message: "fetched game",
            game: game,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getGame = getGame;
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
