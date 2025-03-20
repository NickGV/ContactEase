const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    user = new User({
      username,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "200h",
    });
    res.json({ token });
  } catch (error) {
        next(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      return next(error);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "200h",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  }
  catch (error) {
    next(error);
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user =
      await User.findById(req.params.id).select("-password");
    res.json(user);
  }
  catch (error) {
    next(error);
  }
}

exports.logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};
