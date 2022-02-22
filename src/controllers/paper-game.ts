import { RequestHandler } from "express";
import Game from "../models/game";
import Submission from "../models/submission";
import { v4 as uuidv4 } from "uuid";

export const createGame: RequestHandler = async (req, res, next) => {
  const room = (req.body as { room: string }).room;
  const name = (req.body as { name: string }).name;

  const uuid = uuidv4();
  const newGame = new Game({ room });

  try {
    //await newGame.save();

    res.status(201).json({ message: "created game", uuid: uuid, name: name });
  } catch (err) {
    console.log(err);
  }
};

export const createSubmissions: RequestHandler = async (req, res, next) => {
  //const submissions = (req.body as { room: string }).room;
  const submissions = req.body;
  res
    .status(201)
    .json({ message: "created submissions", submissions: submissions });
  /* const newSubmission = new Submission({ submissions });

  try {
    await newGame.save();

    res.status(201).json({ message: "created game", room: room });
  } catch (err) {
    console.log(err);
  } */
};
