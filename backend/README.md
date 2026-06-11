# DevTrack Backend

Express + MongoDB API for the DevTrack mobile app and public progress pages.

## Setup

```bash
npm install
npm run dev
```

The API reads database settings from `backend/.env`.

```bash
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.cu5aief.mongodb.net/devtrack?retryWrites=true&w=majority
CLIENT_ORIGIN=*
```

## Scripts

```bash
npm run dev
npm start
npm run seed
```

## Routes

- `GET /health`
- `GET /api/profiles`
- `GET /api/profiles/:slug`
- `POST /api/profiles`
- `PATCH /api/profiles/:slug`

## Example Profile Payload

```json
{
  "slug": "arjun",
  "name": "Arjun",
  "headline": "React Native developer building DevTrack",
  "skills": ["React Native", "Node.js", "MongoDB"],
  "stats": {
    "streakDays": 12,
    "codingHoursToday": 4.6,
    "monthlyCommits": 84,
    "completedTasks": 6,
    "totalTasks": 10
  }
}
```
