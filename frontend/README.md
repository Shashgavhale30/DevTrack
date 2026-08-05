# DevTrack Mobile App 📱

The React Native mobile application for **DevTrack** — a developer productivity and progress tracking app. Written in **pure JavaScript** (no TypeScript).

## Tech Stack

- **React Native** `0.85.3`
- **React** `19.2.3`
- **JavaScript** (ES6+)

## Project Structure

```
frontend/
├── android/               # Android native project
├── ios/                   # iOS native project
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ActivityCard.js
│   │   ├── Avatar.js
│   │   ├── Header.js
│   │   ├── NavBar.js
│   │   ├── ProgressCard.js
│   │   ├── ProjectsSection.js
│   │   ├── SectionHeader.js
│   │   ├── StatCard.js
│   │   └── TasksSection.js
│   ├── data/
│   │   └── mockData.js    # Sample dashboard data
│   ├── screens/
│   │   └── Homepage.js    # Main dashboard screen
│   ├── theme/
│   │   └── colors.js      # Shared color palette
│   └── utils/
│       └── helpers.js     # Greeting & activity helpers
├── App.js                 # App entry point
└── index.js               # React Native entry registration
```

## Getting Started

### Prerequisites

- **Node.js** `>= 22.11.0`
- Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)

### Install & Run

```sh
npm install

# Android
npm run android

# iOS (first time: run `bundle install` then `bundle exec pod install`)
npm run ios
```

### Tests & Lint

```sh
npm test
npm run lint
```

---

Built with ❤️ for developers who love tracking their progress.
