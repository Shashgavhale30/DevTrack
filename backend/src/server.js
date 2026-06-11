require('dotenv').config();

const app = require('./app');
const connectDb = require('./db');

const port = process.env.PORT || 5000;

async function start() {
  try {
    await connectDb();

    app.listen(port, () => {
      console.log(`DevTrack API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start DevTrack API:', error.message);
    process.exit(1);
  }
}

start();
