const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST /api/contact
router.post('/', (req, res) => {
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

    newContact.save();
    res.status(201).json({ msg: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
