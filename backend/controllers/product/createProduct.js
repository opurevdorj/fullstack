const Product = require("../../models/product")
const multer = require('multer')

const upload = multer({dest : 'uploads/'}).single('photo') 

const createProduct = async (req, res) => {
  const { image, name, price, description, category } = req.body;

  const userId = req.user._id;

  try {
    if (!image || !name || !price || !description || !category || !userId) {
      return res.status(400).json({
        message: `All fields are required`,
      });
    } else {
      const product = await Product.create({
        image,
        name,
        price,
        description,
        category,
        userId,
      });
      res.status(200).json( product );
    }
  } catch (err) {
    res.status(500).json({
      messege: err.message,
    });
  }
};

module.exports = { createProduct };
