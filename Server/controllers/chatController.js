const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

exports.getOrCreateChat = async (req, res) => {
  const { phoneNumber } = req.body;
  const userId = req.user.id;
  try {
    const contact = await User.findOne({ phoneNumber });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, contact._id] },
    });

    if (chat) {
      const messages = await Message.find({ chatId: chat._id }).sort({
        timestamp: 1,
      });
      return res.json({ chat, messages });
    }

    chat = new Chat({
      participants: [userId, contact._id],
    });

    await chat.save();

    await User.updateMany(
      { _id: { $in: [userId, contact._id] } },
      { $push: { chats: chat._id } }
    );

    res.status(201).json({ chat });
  } catch (err) {
    res.status(500).send("Server error");
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
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(chat.messages);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, content } = req.body;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const message = new Message({
      chatId,
      senderId: req.user.id,
      content,
    });

    const io = req.app.get("io");
    io.to(chatId).emit("sendMessage", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.deleteChat = async (req, res) => {
 const {chatId} = req.params

 try{
  const chat = await Chat.findById(chatId)

  if(!chat){
    return res.status(404).json({message: "Chat not found"})
  }
  await Chat.findByIdAndDelete(chatId)
  res.json({message: "Chat deleted"})

 } catch (err){
   res.status(500).send("Server error")
 }
}

exports.getChats = async (req, res) => {
  const userId = req.user.id;
  try {
    const chats = await Chat.find({ participants: userId }).populate('participants', 'username phoneNumber email');
    res.json(chats)
  }catch(err){
    res.status(500).send("Server error");
  }
}