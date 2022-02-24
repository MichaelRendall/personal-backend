import { Router } from "express";
import { createGame, createSubmissions } from "../controllers/paper-game";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create-game",
  [body("room").trim().not().isEmpty(), body("name").trim().not().isEmpty()],
  createGame
);

router.post("/create-submissions", createSubmissions);

export default router;
