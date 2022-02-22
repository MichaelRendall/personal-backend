import { Router } from "express";
import { createGame } from "../controllers/paper-game";

const router = Router();

router.post("/create-game", createGame);

export default router;
