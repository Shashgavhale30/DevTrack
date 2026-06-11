require('dotenv').config();

const connectDb = require('./db');
const DeveloperProfile = require('./models/DeveloperProfile');

const demoProfile = {
  slug: 'arjun',
  name: 'Arjun',
  headline: 'React Native developer building DevTrack',
  bio: 'Tracking daily coding progress, project milestones, and public proof of work for hiring partners.',
  location: 'India',
  skills: ['React Native', 'Node.js', 'MongoDB', 'GitHub'],
  stats: {
    streakDays: 12,
    codingHoursToday: 4.6,
    monthlyCommits: 84,
    completedTasks: 6,
    totalTasks: 10,
  },
  projects: [
    {
      name: 'DevTrack Mobile',
      description: 'Personal developer progress dashboard',
      status: 'In Progress',
      stack: ['React Native', 'TypeScript'],
      progress: 72,
    },
    {
      name: 'Public Progress Page',
      description: 'Shareable web profile for HR, recruiters, and hiring partners',
      status: 'In Progress',
      stack: ['React', 'Node.js', 'MongoDB'],
      progress: 54,
    },
  ],
  tasks: [
    {
      title: 'Build dashboard cards',
      project: 'DevTrack Mobile',
      due: 'Today',
      done: true,
    },
    {
      title: 'Design public profile view',
      project: 'Public Progress Page',
      due: 'Today',
      done: false,
    },
  ],
};

async function seed() {
  await connectDb();
  await DeveloperProfile.findOneAndUpdate(
    { slug: demoProfile.slug },
    demoProfile,
    { upsert: true, new: true, runValidators: true },
  );
  console.log('Seeded demo profile: arjun');
  process.exit(0);
}

seed().catch(error => {
  console.error(error);
  process.exit(1);
});
