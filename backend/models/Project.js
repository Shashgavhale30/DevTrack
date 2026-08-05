import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
      maxlength: [100, 'Project name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    icon: {
      type: String,
      default: '</>',
    },
    accent: {
      type: String,
      default: '#806bff',
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'On Hold', 'Not Started'],
      default: 'Not Started',
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot be more than 100'],
    },
  },
  {
    timestamps: true,
  },
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
