const express = require('express');
const Registration = require('../models/Registration');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const registration = await Registration.create(req.body);
    res.status(201).json(registration);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This email is already registered.' });
    }

    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, loginProvider } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Enter a valid registered email.' });
    }

    if (!['email', 'google', 'github', 'leetcode'].includes(loginProvider)) {
      return res.status(400).json({ message: 'Choose a valid login method.' });
    }

    const registration = await Registration.findOne({
      email: email.toLowerCase(),
      loginProvider,
    });

    if (!registration) {
      return res.status(401).json({
        message: 'No registered account found for this email and login method.',
      });
    }

    res.json({
      message: 'Login successful',
      registration,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:email', async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      email: req.params.email.toLowerCase(),
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json(registration);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
