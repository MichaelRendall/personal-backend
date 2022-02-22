"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paper_game_1 = require("../controllers/paper-game");
const router = (0, express_1.Router)();
router.post("/create-game", paper_game_1.createGame);
exports.default = router;
