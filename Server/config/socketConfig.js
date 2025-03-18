const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const Chat = require("../models/Chat");

const configureSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = { id: decoded.id };
        return next();
      } catch (err) {
        return next(new Error("Authentication error"));
      }
    } else {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("New client connected, ID:", socket.id);
    
    socket.join(socket.user.id);
    console.log(`User ${socket.user.id} joined personal notification room`);

    socket.on("joinChat", async ({ chatId }) => {
      socket.join(chatId);
      console.log(`User ${socket.user.id} joined chat ${chatId}`);
    });

    socket.on("sendMessage", async ({ chatId, content }) => {
      try {
        const message = new Message({
          chatId,
          senderId: socket.user.id,
          content,
        });

        await message.save();

        const chat = await Chat.findById(chatId);
        chat.messages.push(message._id);
        await chat.save();

        io.to(chatId).emit("sendMessage", message);

        chat.participants.forEach((participant) => {
          const participantId = participant.toString();
          if (participantId !== socket.user.id) {
            console.log(`Emitting notification to participant: ${participantId}`);
            io.to(participantId).emit("newMessageNotification", { chatId, message });
          }
        });
      } catch (err) {
        console.error("Error in sendMessage:", err.message);
      }
    });
    
    socket.on("joinAllChats", async ({ chatIds }) => {
      if (!chatIds || !Array.isArray(chatIds)) {
        console.log("Invalid chatIds received");
        return;
      }
      
      chatIds.forEach((chatId) => {
        if (chatId) {
          socket.join(chatId);
          console.log(`User ${socket.user.id} joined chat ${chatId}`);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = configureSocket;
