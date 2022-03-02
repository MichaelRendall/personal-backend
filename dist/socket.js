"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let io;
module.exports = {
    init: (httpServer) => {
        io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error("socket.io not initialised");
        }
        return io;
    },
};
exports.default = io;
