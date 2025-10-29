require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { generateResponse } = require("./src/service/ai.service");
const { Socket } = require("dgram");
const { text } = require("stream/consumers");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
const chatHistory = [];
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("chat message", async (msg) => {
    console.log("Message from client:", msg);
    chatHistory.push({
      role: "user",
      parts: [{ text: msg }],
    });
    const reply = await generateResponse(chatHistory);
    socket.emit("reply", "Got your message: " + reply);
    chatHistory.push({
      role: "assistant",
      parts: [{ text: reply }],
    });
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
