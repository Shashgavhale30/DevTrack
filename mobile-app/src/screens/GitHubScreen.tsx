import React from 'react';
import ToolScreen from './ToolScreen';
import type { MainScreen, Registration } from '../types';

function GitHubScreen({
  activeScreen,
  onNavigate,
  user,
}: {
  activeScreen: MainScreen;
  onNavigate: (screen: MainScreen) => void;
  user: Registration | null;
}) {
  return (
    <ToolScreen
      accent="#5BE37D"
      activeScreen={activeScreen}
      description="Track repositories, commits, and contribution consistency for this registered account."
      icon="GH"
      metricLabel="GitHub status"
      metricValue="Connected"
      onNavigate={onNavigate}
      platform="github"
      title="GitHub"
      user={user}
    />
  );
}

export default GitHubScreen;
