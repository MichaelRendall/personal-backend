import { RequestHandler } from "express";
import Game from "../models/game";

export const createGame: RequestHandler = async (req, res, next) => {
  const roomName = (req.body as { text: string }).text;

  const newGame = new Game(roomName);

  try {
    await newGame.save();

    res.status(201).json({
      message: "Game created successfully!",
    });
  } catch (err) {
    console.log(err);
  }
};
