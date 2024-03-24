const express = require("express");
const Property = require("../models/Product");
const router = express.Router();

// Endpoint to get all product
router.get("/product", async (req, res) => {
  try {
    // Fetch all product from the database
    const product = await Property.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
    console.error(error);
  }
});

module.exports = router;
