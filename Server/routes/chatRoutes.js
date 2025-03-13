const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

console.log(chatController.deleteChat)
router.post('/', authMiddleware, chatController.getOrCreateChat);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);
router.post('/send', authMiddleware, chatController.sendMessage);
router.delete('/:chatId', authMiddleware, chatController.deleteChat);	
router.get('/chats', authMiddleware, chatController.getChats);

module.exports = router;