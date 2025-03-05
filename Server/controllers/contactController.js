const Contact = require("../models/Contact");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.addContact = async (req, res) => {
  const { name, email, phone, notes } = req.body;

  try {
    const newContact = new Contact({
      userId: req.user.id,
      name,
      email,
      phone,
      notes,
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, notes, isFavorite } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contacto not found" });
    }

    if (contact.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.notes = notes || contact.notes;
    contact.isFavorite = isFavorite || contact.isFavorite;

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndDelete(id);
    res.json({ msg: "Contact deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
