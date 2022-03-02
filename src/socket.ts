import { Server } from "socket.io";
let io: Server<any>;

module.exports = {
  init: (httpServer: any) => {
    io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000", //your client URL
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

export default io!;
