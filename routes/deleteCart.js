// Import necessary modules
const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// DELETE route to delete a cart
router.delete("/cart/deleteCart/:id", async (req, res) => {
  const cartId = req.params.id;

  try {
    // Find the cart by ID and delete it from the database
    const deleteCart = await Cart.findByIdAndDelete(cartId);
    console.log(deleteCart)

    if (!deleteCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully", deleteCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
