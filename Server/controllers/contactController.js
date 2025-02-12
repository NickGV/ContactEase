const Contact = require("../models/Contact");

exports.getContacts = async (req, res) => {
  console.log(req.user);
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
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
    const { name, email, phone, notes } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    if (contact.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;
    contact.notes = notes || contact.notes;

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
