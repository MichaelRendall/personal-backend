import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import paperGameRoutes from "./routes/paper-game";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(paperGameRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/games?retryWrites=true&w=majority`
  )
  .then((result) => {
    const server = app.listen(8080);
    //const io = require("socket.io")(server);
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000", //your client URL
        methods: ["GET", "POST"],
      },
    });

    console.log("got here");
    app.set("socketio", io);

    io.use((socket: any, next) => {
      const sessionId = socket.handshake.auth.sessionId;
      if (sessionId) {
        socket.sessionId = sessionId;
        return next();
      }
      // create new session
      socket.sessionId = uuidv4();
      next();
    });

    io.on("connection", (socket: any) => {
      console.log(socket.sessionId);

      socket.emit("session", {
        sessionId: socket.sessionId,
      });

      app.set("socket", socket);
    });
  })
  .catch((err) => console.log(err));
