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
exports.getScoreboard = exports.submitScore = void 0;
const flag_quiz_1 = __importDefault(require("../models/flag-quiz"));
const express_validator_1 = require("express-validator");
const submitScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new Error("Please fill your nickname");
    }
    const nickname = req.body.nickname;
    const score = req.body.score;
    const time = req.body.time;
    const filters = req.body.filter;
    try {
        const newQuizScore = new flag_quiz_1.default({
            nickname,
            score,
            time,
            filters,
        });
        yield newQuizScore.save();
        res.status(201).json({
            message: "score submitted",
            nickname,
            score,
            time,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.submitScore = submitScore;
const getScoreboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.body.filter;
    try {
        const scoreboard = yield flag_quiz_1.default.find({ filters: filters }).sort({
            score: -1,
            time: 1,
        });
        if (!scoreboard) {
            throw new Error("No Scores Exist Yet");
        }
        res.status(200).json({
            message: "got scoreboard",
            flagScores: scoreboard,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getScoreboard = getScoreboard;
