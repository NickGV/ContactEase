const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChat = async (req, res) => {
  const { userIds } = req.body;
  try {
    let chat = await Chat.findOne({ participants: { $all: userIds } });

    if (!chat) {
      chat = new Chat({
        participants: userIds,
      });
    }

    await chat.save();

    await User.updateMany(
      { _id: { $in: userIds } },
      { $push: { chats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      return res.status(404).json({ msg: "Chat no encontrado" });
    }

    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat no encontrado" });
    }

    const message = new Message({
      chatId,
      senderId: req.user.id,
      content,
    });

    await message.save();

    chat.messages.push(message);
    await chat.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
