import { RequestHandler } from "express";
import FlagQuiz from "../models/flag-quiz";
import { validationResult } from "express-validator";

export const submitScore: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Please fill your nickname");
  }

  const nickname = (req.body as { nickname: string }).nickname;
  const score = (req.body as { score: number }).score;

  try {
    const newQuizScore = new FlagQuiz({
      nickname,
      score,
    });

    await newQuizScore.save();

    res.status(201).json({
      message: "score submitted",
      nickname,
      score,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getScoreboard: RequestHandler = async (req, res, next) => {
  try {
    const scoreboard = await FlagQuiz.find();

    if (!scoreboard) {
      throw new Error("No Scores Exist Yet");
    }

    res.status(200).json({
      message: "got scoreboard",
      flagScores: scoreboard,
    });
  } catch (err) {
    next(err);
  }
};
