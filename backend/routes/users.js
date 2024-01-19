const express = require("express");
const {SignInUser, SignUpUser, updateUser} = require("../controllers/user");
const auth = require("../middleware/auth");

const router = express.Router();


router.post("/sign-in", SignInUser);

router.post("/sign-up", SignUpUser);

router.use(auth);

router.put("/profile", updateUser);

module.exports = router;
