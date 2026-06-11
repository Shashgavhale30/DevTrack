const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    status: { type: String, default: 'In Progress', trim: true },
    stack: [{ type: String, trim: true }],
    progress: { type: Number, default: 0, min: 0, max: 100 },
    repoUrl: { type: String, default: '', trim: true },
    demoUrl: { type: String, default: '', trim: true },
  },
  { _id: true },
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    project: { type: String, default: '', trim: true },
    due: { type: String, default: 'Today', trim: true },
    done: { type: Boolean, default: false },
  },
  { _id: true },
);

const statSchema = new mongoose.Schema(
  {
    streakDays: { type: Number, default: 0 },
    codingHoursToday: { type: Number, default: 0 },
    monthlyCommits: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    totalTasks: { type: Number, default: 0 },
  },
  { _id: false },
);

const developerProfileSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    headline: { type: String, default: '', trim: true },
    bio: { type: String, default: '', trim: true },
    location: { type: String, default: '', trim: true },
    skills: [{ type: String, trim: true }],
    stats: { type: statSchema, default: () => ({}) },
    projects: [projectSchema],
    tasks: [taskSchema],
    publicProfileEnabled: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DeveloperProfile', developerProfileSchema);
