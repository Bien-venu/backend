// Import necessary modules
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// DELETE route to delete a product
router.delete("/products/delete/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID and delete it from the database
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
