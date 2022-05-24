import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.APPLICATION_BASE_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', socket => {
  socket.on("sendMensage", message => {
    socket.broadcast.emit("receivedMessage", message);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});