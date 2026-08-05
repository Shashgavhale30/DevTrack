import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [200, 'Task title cannot be more than 200 characters'],
    },
    accent: {
      type: String,
      default: '#55dd78',
    },
    due: {
      type: String,
      default: 'Today',
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
