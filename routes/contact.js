const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// OPTIONS /api/contact
router.options('/', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200); // Respond with 200 OK
});


// POST /api/contact
router.post('/', async (req, res) => {
  const { username, phoneNumber, email, subject, message } = req.body;

  // Simple validation
  if (!username || !phoneNumber || !email || !subject || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields.' });
  }

  try {
    const newContact = new Contact({
      username,
      phoneNumber,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ msg: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
