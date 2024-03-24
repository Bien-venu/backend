const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// Endpoint to get all cart
router.get("/cart", async (req, res) => {
  try {
    // Fetch all cart from the database
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
    console.error(error);
  }
});

module.exports = router;