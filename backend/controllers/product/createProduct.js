const Product = require("../../models/product")

const createProduct = async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: `All fields are required`,
      });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
      });
      res.status(200).json({ product });
    }
  } catch (err) {
    res.status(500).json({
      messege: err.message,
    });
  }
};

module.exports = { createProduct };
