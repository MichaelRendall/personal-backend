import { RequestHandler } from "express";
import Game from "../models/game";

export const createGame: RequestHandler = async (req, res, next) => {
  const room = (req.body as { room: string }).room;

  const newGame = new Game({ room });

  try {
    await newGame.save();

    res.status(201).json({ message: "created game", room: room });
  } catch (err) {
    console.log(err);
  }
};
