const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, contactController.getContacts);
router.post("/add", authMiddleware, contactController.addContact);
router.put("/update/:id", authMiddleware, contactController.updateContact);
router.delete("/delete/:id", authMiddleware, contactController.deleteContact);

module.exports = router;