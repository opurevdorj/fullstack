const mongoose = require("mongoose");
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});

};

const SignInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please enter your email and password");
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send("User doesn't exist, Check your email");
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).send("Invalid password");
    return;
  }
  const token = createToken(user._id)
  res.status(200).json({ user: { id: user._id, email: user.email, fullname: user.fullname, userImage: user.userImage }, token });
};

module.exports = { SignInUser };
