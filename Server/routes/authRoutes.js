const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/edit', authMiddleware, authController.updateUser)
router.get('/logout', authController.logout);
router.delete('/delete', authMiddleware, authController.deleteUser);
router.get('/user', authMiddleware, authController.getUser);
router.get('/user/:id', authMiddleware, authController.getUserById);

module.exports = router;