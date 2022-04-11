"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../controllers/contact");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.post("/send-message", [(0, express_validator_1.body)("name").trim().not().isEmpty(), (0, express_validator_1.body)("message").trim().not().isEmpty()], contact_1.sendMessage);
exports.default = router;
