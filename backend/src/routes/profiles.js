const express = require('express');
const DeveloperProfile = require('../models/DeveloperProfile');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const profiles = await DeveloperProfile.find().sort({ updatedAt: -1 });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const profile = await DeveloperProfile.findOne({ slug: req.params.slug.toLowerCase() });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const profile = await DeveloperProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
});

router.patch('/:slug', async (req, res, next) => {
  try {
    const profile = await DeveloperProfile.findOneAndUpdate(
      { slug: req.params.slug.toLowerCase() },
      req.body,
      { new: true, runValidators: true },
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
