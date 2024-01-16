const Product = require("../../models/product")
const multer = require('multer')

const upload = multer({dest : 'uploads/'}).single('photo') 

const createProduct = async (req, res) => {
  const { name, price, description, category, type, productImage } = req.body;

  const userId = req.user._id;
  const userEmail = req.user.email;

  try {
    if ( !name || !price || !description || !category || !userId || !userEmail || !productImage) {
      return res.status(400).json({
        message: `All fields are required`,
      });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
        userId,
        userEmail,
        type,
        productImage,
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
