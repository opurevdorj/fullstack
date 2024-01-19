const User = require("../../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  const { fullname, email, password, userImage, newFullname, newEmail, newPassword, newUserImage} =
    req.body;

  // if (
  //   !fullname ||
  //   !email ||
  //   !password ||
  //   !newFullname ||
  //   !newEmail ||
  //   !newPassword
  // ) {
  //   res.status(400).json({ message: "All inputs required" });
  //   return;
  // }

  try {
    const user = await User.findOne({ email });

    // if (!user) {
    //   res.status(404).json({ message: "User not found" });
    //   return;
    // }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    if (!validator.isEmail(newEmail)) {
      res.status(400).send("Please enter valid email");
      return;
    }

    if (!validator.isStrongPassword(newPassword)) {
      res.status(400).send("Please enter a strong password");
      return;
    }
    const salt = await bcrypt.genSalt(10); // 10 characters adding

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.fullname = newFullname;
    user.email = newEmail;
    user.password = hashedPassword;
    user.userImage = newUserImage;

    const updatedUser = await user.save();
    res.status(200).json({
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        fullname: updatedUser.fullname,
       userImage: updatedUser.userImage
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateUser };
