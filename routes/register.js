const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, image } = req.body; // Add 'image' to the destructuring

  try {
    // Simple validation
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "Please enter all fields." });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "Email is already registered." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password and image
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      image,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(200).json({ message: "Registration successful!" });
    console.log(savedUser)
  } catch (error) {
    res.status(402).json({ error: "Registration failed. Please try again." });
    console.error(error);
  }
});

module.exports = router;