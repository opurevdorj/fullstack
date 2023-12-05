const Note = require("../../models/note")

const createNote = async (req, res) => {
  const { title, paragraph, description, category } = req.body;

  try {
    if (!title || !paragraph || !description || !category) {
      return res.status(400).json({
        message: `All fields are required`,
      });
    } else {
      const note = await Note.create({
        title,
        paragraph,
        description,
        category,
      });
      res.status(200).json({ note });
    }
  } catch (err) {
    res.status(500).json({
      messege: err.message,
    });
  }
};

module.exports = { createNote };