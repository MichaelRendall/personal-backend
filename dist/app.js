"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const paper_game_1 = __importDefault(require("./routes/paper-game"));
const socket_io_1 = require("socket.io");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
app.use(paper_game_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.dyb0r.mongodb.net/games?retryWrites=true&w=majority`)
    .then((result) => {
    const server = app.listen(8080);
    //const io = require("socket.io")(server);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    console.log("got here");
    app.set("socketio", io);
    /*  io.on("connection", (socket: any) => {
      console.log(socket.id);
    }); */
})
    .catch((err) => console.log(err));
