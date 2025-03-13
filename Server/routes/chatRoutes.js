const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, chatController.getOrCreateChat);
router.get('/:chatId/messages', authMiddleware, chatController.getMessages);
router.post('/send', authMiddleware, chatController.sendMessage);
router.get('/chats', authMiddleware, chatController.getChats);

module.exports = router;