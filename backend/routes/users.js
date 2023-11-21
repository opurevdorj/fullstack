const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const userData = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
  {
    id: 3,
    name: "Doe",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const user = userData.find((user) => user.id == id);

  if (!user) {
    res.status(404).json({ messege: "user not found" });
  }
  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const name = req.body.name;

  const newUser = {
    id: uuidv4(),
    name: name,
  };

  userData.push(newUser);

  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newName = req.body.name;
  const user = userData.find((user) => user.id == id);
  if (!user) {
    res.status(404).json({ messege: "user not found" });
  }

  user.name = newName;
  res.status(200).json(user);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const user = userData.find((user) => user.id == id);
  if (!user) {
    res.status(404).json({ messege: "user not found" });
  }
  const index = userData.indexOf(user);
  userData.splice(index, 1);
  res.status(200).json(userData);
});

module.exports = router;
