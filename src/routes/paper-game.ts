import { Router } from "express";
import {
  createGame,
  joinGame,
  leaveGame,
  getGame,
  createSubmissions,
} from "../controllers/paper-game";
import { body } from "express-validator";

const router = Router();

router.post(
  "/create-game",
  [body("room").trim().not().isEmpty(), body("name").trim().not().isEmpty()],
  createGame
);

router.post(
  "/join-game",
  [body("room").trim().not().isEmpty(), body("name").trim().not().isEmpty()],
  joinGame
);

router.post(
  "/leave-game",
  [body("roomId").trim().not().isEmpty(), body("uuid").trim().not().isEmpty()],
  leaveGame
);

router.get("/get-game/:roomId", getGame);

router.post("/create-submissions", createSubmissions);

export default router;
