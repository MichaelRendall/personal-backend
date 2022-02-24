"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paper_game_1 = require("../controllers/paper-game");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/create-game", [(0, express_validator_1.body)("room").trim().not().isEmpty(), (0, express_validator_1.body)("name").trim().not().isEmpty()], paper_game_1.createGame);
router.post("/create-submissions", paper_game_1.createSubmissions);
exports.default = router;
