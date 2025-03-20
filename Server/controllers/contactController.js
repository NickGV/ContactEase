const Contact = require("../models/Contact");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  const { name, email, phoneNumber, notes } = req.body;
  try {
    const newContact = new Contact({
      userId: req.user.id,
      name,
      email,
      phoneNumber,
      notes,
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

exports.updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, notes, isFavorite } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      const error = new Error('Contact not found');
      error.statusCode = 404;
      return next(error);
    }

    if (contact.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      return next(error);
    }

    contact._id = id;
    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phoneNumber = phoneNumber || contact.phoneNumber;
    contact.notes = notes || contact.notes;
    contact.isFavorite = isFavorite !== undefined ? isFavorite : contact.isFavorite;

    await contact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      const error = new Error('Contact not found');
      error.statusCode = 404;
      return next(error);
    }

    if (contact.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      return next(error);
    }

    await Contact.findByIdAndDelete(id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      const error = new Error('Contact not found');
      error.statusCode = 404;
      return next(error);
    }

    if (contact.userId.toString() !== req.user.id) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      return next(error);
    }

    console.log(contact);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
