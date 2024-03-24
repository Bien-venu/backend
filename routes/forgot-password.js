const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/Users");
 
// Define Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bienvenee@gmail.com", // Your email
    pass: "Websinu2", // Your email password or an app password for Gmail
  },
});

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    // Save the reset token and expiration in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;

    await user.save();

    // Send the reset link to the user's email
    const resetLink = `http://localhost:3000/password/${resetToken}`;
    const mailOptions = {
      from: "maziyves@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    };

    // Use your transporter to send the email
    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error:", error.message); 
    res.status(500).json({ message: "Internal Server Error" });
  }

});

module.exports = router;
