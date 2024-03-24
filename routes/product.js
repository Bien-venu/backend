const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const router = express.Router();

router.post("/product", async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    category,
  } = req.body; 

  const images = req.files;

  try {

    const newProduct = new Product({
      name,
    description,
    image,
    price,
    category,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Add product successful!" });
  } catch (error) {
    res.status(402).json({ error: "Add product failed. Please try again." });
    console.error(error);
  }
});

module.exports = router;
