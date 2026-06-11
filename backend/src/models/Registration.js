const mongoose = require('mongoose');

const platformAccountSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ['google', 'github', 'leetcode'],
    },
    usesSameEmail: { type: Boolean, required: true },
    platformId: { type: String, default: '', trim: true },
  },
  { _id: false },
);

const registrationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
      unique: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    loginProvider: {
      type: String,
      required: true,
      enum: ['email', 'google', 'github', 'leetcode'],
      default: 'email',
    },
    platformAccounts: {
      type: [platformAccountSchema],
      validate: {
        validator(accounts) {
          return accounts.every(account => account.usesSameEmail || account.platformId);
        },
        message: 'Platform ID is required when a platform uses a different email.',
      },
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Registration', registrationSchema);
