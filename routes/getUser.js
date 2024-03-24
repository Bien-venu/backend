const express = require("express");
const Users = require("../models/Users");
const router = express.Router();

// Endpoint to get all users
router.get("/users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
    console.error(error);
  }
});

module.exports = router;