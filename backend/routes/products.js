const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

//Auth token
router.use(auth);

// GET /products => get all products

router.get("/", getAllProducts);

// GET /products/:id => get a single product

router.get("/:id", getSingleProduct);

// POST /products => create a new product

router.post("/", createProduct);

// PUT /products/:id => update a single product

router.put("/:id", updateProduct);

// DELETE /products/:id => delete a single product

router.delete("/:id", deleteProduct);

module.exports = router;
