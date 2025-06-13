const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getOrCreateChat = async (req, res, next) => {
  const { phoneNumber } = req.body;
  const userId = req.user.id;

  try {
    const contact = await User.findOne({ phoneNumber });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const contactObjectId = contact._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, contactObjectId] },
    })
    .populate('participants', 'username phoneNumber email')
    .populate({
      path: 'messages',
      options: { sort: { timestamp: -1 }, limit: 1 }
    });

    if(chat){
      if(chat.deletedFor.includes(userId)) {
        chat.deletedFor = chat.deletedFor.filter(id => id.toString() !== userId);
        await chat.save();
      }
      return res.json({ chat });
    }
    

    if (!chat) {
      chat = new Chat({
        participants: [userId, contactObjectId],
        messages: [],
        deletedFor: []
      });
      await chat.save();
      chat = await Chat.findById(chat._id)
        .populate('participants', 'username phoneNumber email')
        .populate({
          path: 'messages',
          options: { sort: { timestamp: -1 }, limit: 1 }
        });
    }

    res.json({ chat });
  } catch (error) {
    next(error);
  }
};

exports.getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  const userId = req.user.id;
  
  try {
    const chat = await Chat.findById(chatId).populate({
      path: "messages",
      options: { sort: { timestamp: 1 } },
    });

    if (!chat) {
      const error = new Error("Chat not found");
      error.statusCode = 404;
      return next(error);
    }

    if (chat.deletedFor.includes(userId)) {
      const error = new Error("Chat not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json(chat.messages);
  } catch (error) {
    next(error);
  }
};

exports.sendMessage = async (req, res, next) => {
  const { chatId, content } = req.body;
  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      const error = new Error("Chat not found");
      error.statusCode = 404;
      return next(error)
    }

    if (!chat.participants.includes(req.user.id)) {
      const error = new Error("Not authorized");
      error.statusCode = 403;
      return next(error);
    }

    if (chat.deletedFor.includes(req.user.id)) {
      chat.deletedFor = chat.deletedFor.filter(id => id.toString() !== req.user.id);
      await chat.save();
    }

    const message = new Message({
      chatId,
      senderId: req.user.id,
      content,
    });

    const io = req.app.get("io");
    io.to(chatId).emit("sendMessage", message);

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

exports.deleteChat = async (req, res, next) => {
 const {chatId} = req.params
 const userId = req.user.id;

 try{
  const chat = await Chat.findById(chatId)

  if(!chat){
    const error = new Error("Chat not found")
    error.statusCode = 404
    return next(error)
  }

  if (!chat.participants.includes(userId)) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    return next(error);
  }

  if (!chat.deletedFor.includes(userId)) {
    chat.deletedFor.push(userId);
    await chat.save();
  }

  const allDeleted = chat.participants.every(participant => 
    chat.deletedFor.some(deletedId => deletedId.toString() === participant.toString())
  )

  if(allDeleted) {
    await Message.deleteMany({ chatId: chat._id });
    await Chat.findByIdAndDelete(chatId);
    return res.json({message: "Chat deleted for all participants"});
  }
  
  res.json({message: "Chat deleted for you"})
 } catch (error){
   next(error)
 }
}

exports.getChats = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId)
  try {
    const chats = await Chat.find({ 
      participants: userId,
      deletedFor: { $ne: userId }
    }).populate('participants', 'username phoneNumber email')
      .populate({
        path: 'messages',
        options: { sort: { timestamp: -1 }, limit: 1 }
      });

    const chatsWithLastMessage = chats.map(chat => ({
      ...chat.toObject(),
      lastMessage: chat.messages[0] || null,
      messages: undefined
    }));
    
    res.json(chatsWithLastMessage)
  }catch(error){
    console.log(error)
    next(error)
  }
}