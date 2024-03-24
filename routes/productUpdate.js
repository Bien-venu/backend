const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Update a product by ID
router.put("/product/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, description, image, price, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        image,
        price,
        category,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

module.exports = router;