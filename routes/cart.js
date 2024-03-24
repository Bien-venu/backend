const express = require("express");
const multer = require("multer");
const path = require("path");
const Cart = require("../models/Cart");
const router = express.Router();

router.post("/cart", async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    category,
    userId,
    userEmail,
    quantity,
    productId
  } = req.body; 

  const images = req.files;

  try {

    const newCart = new Cart({
      name,
    description,
    image,
    price,
    category,
    userId,
    userEmail,
    quantity,
    productId
    });

    // Save the cart to the database
    const savedCart = await newCart.save();
    res.status(200).json({ message: "Add cart successfully!" });
  } catch (error) {
    res.status(402).json({ error: "Add cart failed. Please try again." });
    console.error(error);
  }
});

module.exports = router;
