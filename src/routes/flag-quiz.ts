import { Router } from "express";
import { submitScore, getScoreboard } from "../controllers/flag-quiz";
import { body } from "express-validator";

const router = Router();

router.post(
  "/submit-score",
  [body("nickname").trim().not().isEmpty()],
  submitScore
);

router.post("/get-scoreboard", getScoreboard);

export default router;
