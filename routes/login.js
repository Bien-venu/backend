const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Get the user's image and name from the database
      const { image, firstname, lastname, id, email } = user; // Assuming the User model has fields for image and name.

      res.cookie("jwt", token, { httpOnly: true });

      // Send the user's image and name along with the success message
      return res.json({
        message: "Login successful!",
        image,
        firstname,
        lastname,
        id,
        email,
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
