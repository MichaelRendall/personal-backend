import { Router } from "express";
import { sendMessage } from "../controllers/contact";
import { body } from "express-validator";

const router = Router();

router.post(
  "/send-message",
  [
    body("name").trim().not().isEmpty(),
    body("email").trim().isEmail(),
    body("message").trim().not().isEmpty(),
  ],
  sendMessage
);

export default router;
