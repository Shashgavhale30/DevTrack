/**
 * Mock data used by the DevTrack dashboard.
 */

export const stats = [
  {
    accent: '#45dc75',
    icon: 'hot',
    label: 'Streak',
    value: '12',
    unit: 'days',
    footnote: 'Keep it up',
  },
  {
    accent: '#8d78ff',
    icon: '</>',
    label: 'Coding Time',
    value: '4.6',
    unit: 'hrs',
    footnote: '+1.2h vs yesterday',
  },
  {
    accent: '#ff5b86',
    icon: 'git',
    label: 'Commits',
    value: '8',
    footnote: '+3 vs yesterday',
  },
  {
    accent: '#4a8dff',
    icon: 'aim',
    label: 'Tasks Done',
    value: '6/10',
    footnote: '60% completed',
  },
];

export const projects = [
  {
    accent: '#806bff',
    icon: '</>',
    name: 'DevTrack Web App',
    description: 'A productivity tracker for developers',
    status: 'In Progress',
    progress: 72,
  },
  {
    accent: '#58dd78',
    icon: 'AI',
    name: 'AI Code Assistant',
    description: 'VS Code extension for AI suggestions',
    status: 'In Progress',
    progress: 48,
  },
];

export const tasks = [
  {
    accent: '#55dd78',
    title: 'Implement authentication flow',
    project: 'DevTrack Web App',
    due: 'Today',
    done: true,
  },
  {
    accent: '#ff5c9e',
    title: 'Design dashboard UI',
    project: 'DevTrack Web App',
    due: 'Today',
    done: false,
  },
  {
    accent: '#5f8dff',
    title: 'Write unit tests',
    project: 'DevTrack Web App',
    due: 'Tomorrow',
    done: false,
  },
];
