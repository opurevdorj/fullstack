const Product = require("../../models/product")

const getAllProducts = async (req, res) => {
try {
    const products = await Product.find({});

    if (!products) {
        res.status(404).json({ message:"Product not found"});
        return;
    }

    res.status(200).json(products);
} catch (err) {
    res.status(500).json({ message: err.message });
}
   };

module.exports = {getAllProducts};