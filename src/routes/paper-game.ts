import { Router } from "express";
import { createGame, createSubmissions } from "../controllers/paper-game";

const router = Router();

router.post("/create-game", createGame);

router.post("/create-submissions", createSubmissions);

export default router;
