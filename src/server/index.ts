import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

let users: any[] = [];

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("message", (message) => {
    // console.log("message", message);
    users = [...users, message];

    users = [
      ...users.reduce((map, obj) => map.set(obj.id, obj), new Map()).values(),
    ];

    io.emit("message", users);
  });

  socket.on("disconnect", () => {
    // console.log(socket.id, "disconnected");
    for (let i = 0; i < users.length; i++) {
      let obj = users[i];

      if (socket.id === obj.id) {
        users.splice(i, 1);
      }
    }
  });
});

const port = 3000;
// const port = process.env.PORT || 3000;

httpServer.listen(port, () => console.log(`server started on ${port}`));
