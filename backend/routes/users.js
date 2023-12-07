const express = require("express");
const {SignInUser, SignUpUser} = require("../controllers/user");

const router = express.Router();

router.post("/sign-in", SignInUser);

router.post("/sign-up", SignUpUser);

module.exports = router;
