const express = require("express");
const router = express.Router();
const User = require("../models/Users"); // Import your User model
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination where uploaded files will be stored.
    cb(null, "public/assets/"); // Create an 'uploads' directory if it doesn't exist.
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files.
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.put("/update", upload.single("image"), async (req, res) => {
  const { email, firstname, lastname } = req.body;

  const image = req.file;
  
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user information
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;

    if (image) {
      // Process image upload logic here (saving image to storage, etc.)
      // For example, if using a model field like user.image, update it with the new image details
      user.image = req.file.filename; // Assuming 'image' is a field in your User model
    }

    // Save the updated user data
    await user.save();

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
