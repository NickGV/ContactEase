const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
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

exports.login = async (req, res, next) => {
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

exports.updateUser = async (req,res,next) => {
  try {
    const {username, email, phoneNumber, currentPassword, newPassword} = req.body

    const user = await User.findById(req.user.id)

    if(!user){
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }

    user.username = username || user.username
    user.email = email || user.email
    user.phoneNumber = phoneNumber || user.phoneNumber


    if (currentPassword && newPassword) {
      console.log('Updating password for user:', user._id);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if(!isMatch){
        const error = new Error('Current password is incorrect')
        error.statusCode = 400
        return next(error)
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    const userWithoutPassword = user.toObject ? user.toObject() : { ...user._doc };
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  }
  catch (error) {
    next(error);
  }
}

exports.getUserById = async (req, res, next) => {
  try {
    const user =
      await User.findById(req.params.id).select("-password");
    res.json(user);
  }
  catch (error) {
    next(error);
  }
}

exports.logout = async (req, res, next) => {
  res.json({ message: "Logout successful" });
};
