const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.id },
        { senderId: req.params.id, receiverId: req.user.id },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;

  try {
    const newMessage = new Message({
      senderId: req.user.id,
      receiverId,
      message,
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
