const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

exports.getOrCreateChat = async (req, res) => {
  const { contactId } = req.body;
  const userId = req.user.id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, contactId] },
    });

    if (chat) {
      const messages = await Message.find({ chatId: chat._id }).sort({
        timestamp: 1,
      });
      return res.json({ chat, messages });
    }

    chat = new Chat({
      participants: [userId, contactId],
    });

    await chat.save();

    await User.updateMany(
      { _id: { $in: [userId, contactId] } },
      { $push: { chats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId).populate({
      path: "messages",
      options: { sort: { timestamp: 1 } },
    });

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat no encontrado" });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    const message = new Message({
      chatId,
      senderId: req.user.id,
      content,
    });

    await message.save();

    chat.messages.push(message);
    await chat.save();

    const io = req.app.get("io");
    io.to(chatId).emit("sendMessage", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
