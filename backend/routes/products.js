const express = require("express");

const router = express.Router();
const Product = require("../models/product")

// GET /products => get all products

router.get("/", (req, res) => {
    res.status(200).json({
    message: "You are requiesting all products"
});
   });

// GET /products/:id => get a single product

router.get("/:id", (req, res) => {
    res.status(200).json({
    message: `You are requiesting a produvt with id ${req.params.id}`
});
   });

// POST /products => create a new product

router.post("/", async (req, res) => {
    const {name, price, description, category} = req.body;

    try {
        if (!name || !price || !description || !category) {
            return res.status(400).json({
message: `All fields are required`
            });
        } else {
            const product = await Product.create({
                name,
                price,
                description,
                category,
            });
            res.status(200).json({product})
            
        }
        }
     catch(err){
        res.status(500).json({
           messege: err.message
        });
     }
});
   

  module.exports = router;