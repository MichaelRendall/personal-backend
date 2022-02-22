import express from "express";
import mongoose from "mongoose";
import paperGameRoutes from "./routes/paper-game";
import "dotenv/config";

const app = express();

//app.use(paperGameRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/games?retryWrites=true&w=majority`
  )
  .then((result) => {
    const server = app.listen(8080);
    console.log("running1");
  })
  .catch((err) => console.log(err));
