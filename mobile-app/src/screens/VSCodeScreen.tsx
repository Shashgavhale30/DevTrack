import React from 'react';
import ToolScreen from './ToolScreen';
import type { MainScreen, Registration } from '../types';

function VSCodeScreen({
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
      accent="#4BA3FF"
      activeScreen={activeScreen}
      description="Prepare editor activity, extensions, and coding-session tracking for this DevTrack user."
      icon="<>"
      metricLabel="Editor sync"
      metricValue="Pending"
      onNavigate={onNavigate}
      title="VS Code"
      user={user}
    />
  );
}

export default VSCodeScreen;
