const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Product image is required"]
    },
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    userId: {
        type: String,
        required: [true, "Product userId is required"]
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Product',productSchema);
