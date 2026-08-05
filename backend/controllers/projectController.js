import Project from '../models/Project.js';

// @desc    Get all projects for the logged-in user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res) => {
  try {
    const { name, description, icon, accent, status, progress } = req.body;

    const project = await Project.create({
      user: req.user._id,
      name,
      description,
      icon,
      accent,
      status,
      progress,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await project.remove();

    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
