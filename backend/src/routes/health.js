const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    ok: true,
    app: 'DevTrack API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
