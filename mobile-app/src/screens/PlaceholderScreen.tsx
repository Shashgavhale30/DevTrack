import React from 'react';
import ToolScreen from './ToolScreen';
import type { MainScreen, Registration } from '../types';

function PlaceholderScreen({
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
      accent="#A18CFF"
      activeScreen={activeScreen}
      description={`${activeScreen} is connected to navigation and ready for the next feature layer.`}
      icon={activeScreen.slice(0, 2).toUpperCase()}
      metricLabel="Page status"
      metricValue="Ready"
      onNavigate={onNavigate}
      title={activeScreen}
      user={user}
    />
  );
}

export default PlaceholderScreen;
