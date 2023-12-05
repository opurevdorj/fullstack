const express = require("express");

const router = express.Router();
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");

// GET /products => get all products

router.get("/", getAllNotes);

// GET /products/:id => get a single product

router.get("/:id", getSingleNote);

// POST /products => create a new product

router.post("/", createNote);

// PUT /products/:id => update a single product

router.put("/:id", updateNote);

// DELETE /products/:id => delete a single product

router.delete("/:id", deleteNote);

module.exports = router;