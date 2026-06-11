import React from 'react';
import ToolScreen from './ToolScreen';
import type { MainScreen, Registration } from '../types';

function LeetCodeScreen({
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
      accent="#FFD64A"
      activeScreen={activeScreen}
      description="Keep coding practice, problem progress, and profile identity tied to the logged-in user."
      icon="LC"
      metricLabel="Practice status"
      metricValue="Ready"
      onNavigate={onNavigate}
      platform="leetcode"
      title="LeetCode"
      user={user}
    />
  );
}

export default LeetCodeScreen;
