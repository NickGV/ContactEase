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

  const activeViewers = new Map();

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
    
    socket.join(socket.user.id);

    socket.on("viewingChat", ({ chatId }) => {
      activeViewers.set(socket.user.id, chatId);
    });

    socket.on("leftChat", () => {
      activeViewers.delete(socket.user.id);
    });

    socket.on("joinChat", async ({ chatId }) => {
      socket.join(chatId);
    });

    socket.on("sendMessage", async ({ chatId, content }) => {
      try {
        const message = new Message({
          chatId,
          senderId: socket.user.id,
          content,
        });

        await message.save();

        const chat = await Chat.findById(chatId)
          .populate('participants', 'username phoneNumber email')
          .populate({
            path: 'messages',
            options: { sort: { timestamp: -1 }, limit: 1 }
          });

        chat.messages.push(message._id);
        await chat.save();

        io.to(chatId).emit("sendMessage", message);

        chat.participants.forEach(async (participant) => {
          const participantId = participant._id ? participant._id.toString() : participant.toString();
          if (participantId !== socket.user.id) {
            const activeChat = activeViewers.get(participantId);

            const wasDeleted = chat.deletedFor.includes(participantId);

            if (wasDeleted) {
              chat.deletedFor = chat.deletedFor.filter(id => id.toString() !== participantId);
              await chat.save();
              
              const populatedChat = await Chat.findById(chat._id)
                .populate('participants', 'username phoneNumber email')
                .populate({
                  path: 'messages',
                  options: { sort: { timestamp: -1 }, limit: 1 }
                });
              
              io.to(participantId).emit("chatRestored", {
                chat: populatedChat,
                message,
                wasArchived: true
              });
            }
            else if (activeChat !== chatId) {
              io.to(participantId).emit("newMessageNotification", { chatId, message });
            }
            io.to(participantId).emit("newChat", chat);
          }
        });
      } catch (err) {
        console.error("Error in sendMessage:", err.message);
      }
    });
    
    socket.on("joinAllChats", async ({ chatIds }) => {
      if (!chatIds || !Array.isArray(chatIds)) {
        return;
      }
      
      chatIds.forEach((chatId) => {
        if (chatId) {
          socket.join(chatId);
        }
      });
    });

    socket.on("disconnect", () => {
      activeViewers.delete(socket.user.id);
    });
  });

  return io;
};

module.exports = configureSocket;