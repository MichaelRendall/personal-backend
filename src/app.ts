import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import paperGameRoutes from "./routes/paper-game";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(paperGameRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/games?retryWrites=true&w=majority`
  )
  .then((result) => {
    const server = app.listen(8080);
    console.log("running1");
  })
  .catch((err) => console.log(err));
