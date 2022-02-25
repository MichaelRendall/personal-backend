import { RequestHandler } from "express";
import Game from "../models/game";
import Submission from "../models/submission";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

export const createGame: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Please fill your name and the room code");
  }

  const room = (req.body as { room: string }).room;
  const name = (req.body as { name: string }).name;
  const uuid = uuidv4();

  const newGame = new Game({
    room,
    users: [{ name: name, uuid: uuid, isHost: true }],
  });

  try {
    const result = await newGame.save();

    res.status(201).json({
      message: "created game",
      uuid: uuid,
      name: name,
      roomId: result._id,
    });
  } catch (err) {
    next(err);
  }
};

export const joinGame: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Please fill your name and the room code");
  }

  const room = (req.body as { room: string }).room;
  const name = (req.body as { name: string }).name;
  const uuid = uuidv4();

  try {
    const existingRoom = await Game.findOne({ room: room });

    if (!existingRoom) {
      throw new Error("Room does not exist");
    }

    existingRoom.users.push({ name: name, uuid: uuid });

    const result = await existingRoom.save();

    res.status(201).json({
      message: "joined game",
      uuid: uuid,
      name: name,
      roomId: result._id,
    });
  } catch (err) {
    next(err);
  }
};

export const leaveGame: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("A valid room and user must be set in order to leave");
  }
  const room = (req.body as { room: string }).room;
  const uuid = (req.body as { uuid: string }).uuid;

  try {
    const existingRoom = await Game.findById(room);

    if (!existingRoom) {
      throw new Error("Room does not exist");
    }
    const updatedUsers = existingRoom.users.filter(
      (user) => user.uuid !== uuid
    );

    existingRoom.users = updatedUsers;
    await existingRoom.save();

    res.status(201).json({
      message: "left game",
    });
  } catch (err) {
    next(err);
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
