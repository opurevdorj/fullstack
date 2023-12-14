const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const SignUpUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!email || !password || !fullname) {
    res.status(400).send("Please enter your email and password");
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).send("Please enter valid email");
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).send("Please enter a strong password");
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }

    // Salting and hashing passwords // huwirgah
    //Password => 123456
    // Adding salt => 123456asfjhfg
    // Hashing password => dfgbfgnh54w6e7i

    // Salt is random string added to password

    const salt = await bcrypt.genSalt(10); // 10 characters adding

    // Hashing passwords //
    //Create new user //
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);
    res
      .status(200)
      .json({ user: { id: newUser._id, email: newUser.email }, token });
  } catch (err) {
    res.status(500).send(err.message);
    return;
  }
};

module.exports = { SignUpUser };
