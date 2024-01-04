const Product = require("../../models/product")

const getAllProducts = async (req, res) => {
    
try {
    const userId = req.user._id
    const products = await Product.find({userId});

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