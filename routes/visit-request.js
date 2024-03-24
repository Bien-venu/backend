const express = require('express');
const VisitRequest = require('../models/VisitRequests');

const router = express.Router();

router.post('/visit-request', async (req, res) => {
  const { fname,lname,email, message, phone } = req.body;
  
  try {
    // Create a new visit request
    const newVisitRequest = new VisitRequest({ firstname:fname,lastname:lname, email:email, message:message, phone:phone });
    console.log()

    // Save the visit request to the database
    const savedVisitRequest = await newVisitRequest.save();

    res.json(savedVisitRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
