"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flag_quiz_1 = require("../controllers/flag-quiz");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/submit-score", [(0, express_validator_1.body)("nickname").trim().not().isEmpty()], flag_quiz_1.submitScore);
router.get("/get-scoreboard", flag_quiz_1.getScoreboard);
exports.default = router;
