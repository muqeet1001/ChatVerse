const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("message", (msg) => {
    console.log("message    : " + msg);

    
    
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
