const cors = require('cors');
const express = require('express');
const healthRoutes = require('./routes/health');
const profileRoutes = require('./routes/profiles');
const registrationRoutes = require('./routes/registrations');

const app = express();
const clientOrigin = process.env.CLIENT_ORIGIN || '*';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'DevTrack API',
    routes: ['/health', '/api/profiles', '/api/profiles/:slug', '/api/registrations'],
  });
});

app.use('/health', healthRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/registrations', registrationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  const status = error.name === 'ValidationError' ? 400 : 500;

  res.status(status).json({
    message: error.message || 'Something went wrong',
  });
});

module.exports = app;
