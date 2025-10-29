require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateResponse } = require("./src/service/ai.service");
const { Socket } = require("dgram");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
 
  io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("chat message", async(msg) => {
    console.log("Message from client:", msg);
    const reply =  await generateResponse(msg);
    socket.emit("reply", "Got your message: " + reply);
  });
});



httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
