import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import paperGameRoutes from "./routes/paper-game";
import flagQuizRoutes from "./routes/flag-quiz";
import contactRoutes from "./routes/contact";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import helmet from "helmet";
import compression from "compression";
import "dotenv/config";

const app = express();

app.use(helmet());
app.use(compression());
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
app.use("/flag-quiz", flagQuizRoutes);
app.use("/contact", contactRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/${process.env.DATABASE_DB}?retryWrites=true&w=majority`
  )
  .then((result) => {
    const server = app.listen(process.env.PORT || 8080);
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    console.log("got here");
    app.set("socketio", io);

    io.use((socket: any, next) => {
      const sessionId = socket.handshake.auth.sessionId;
      const roomId = socket.handshake.auth.roomId;

      if (sessionId) {
        socket.sessionId = sessionId;
        socket.roomId = roomId;
        return next();
      }
      // create new session
      socket.sessionId = uuidv4();
      next();
    });

    io.on("connection", (socket: any) => {
      app.set("socket", socket);

      socket.emit("session", {
        sessionId: socket.sessionId,
        roomId: socket.roomId,
      });

      if (socket.roomId) {
        socket.join(socket.roomId);
      }
    });
  })
  .catch((err) => console.log(err));
