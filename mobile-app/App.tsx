import React, { useState } from 'react';
import GitHubScreen from './src/screens/GitHubScreen';
import Homepage from './src/screens/Homepage';
import LeetCodeScreen from './src/screens/LeetCodeScreen';
import LoginScreen from './src/screens/LoginScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import VSCodeScreen from './src/screens/VSCodeScreen';
import type { MainScreen, Registration } from './src/types';

type AuthScreen = 'login' | 'register' | 'home';

function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [mainScreen, setMainScreen] = useState<MainScreen>('Home');
  const [currentUser, setCurrentUser] = useState<Registration | null>(null);

  if (authScreen === 'register') {
    return (
      <RegistrationScreen
        onLogin={() => setAuthScreen('login')}
        onRegistered={registration => {
          setCurrentUser(registration);
          setMainScreen('Home');
          setAuthScreen('home');
        }}
      />
    );
  }

  if (authScreen === 'login') {
    return (
      <LoginScreen
        onLogin={registration => {
          setCurrentUser(registration);
          setMainScreen('Home');
          setAuthScreen('home');
        }}
        onRegister={() => setAuthScreen('register')}
      />
    );
  }

  const logout = () => {
    setCurrentUser(null);
    setMainScreen('Home');
    setAuthScreen('login');
  };

  if (mainScreen === 'GitHub') {
    return <GitHubScreen activeScreen={mainScreen} onNavigate={setMainScreen} user={currentUser} />;
  }

  if (mainScreen === 'LeetCode') {
    return <LeetCodeScreen activeScreen={mainScreen} onNavigate={setMainScreen} user={currentUser} />;
  }

  if (mainScreen === 'VS Code') {
    return <VSCodeScreen activeScreen={mainScreen} onNavigate={setMainScreen} user={currentUser} />;
  }

  if (mainScreen !== 'Home') {
    return <PlaceholderScreen activeScreen={mainScreen} onNavigate={setMainScreen} user={currentUser} />;
  }

  return (
    <Homepage
      activeScreen={mainScreen}
      onLogout={logout}
      onNavigate={setMainScreen}
      user={currentUser}
    />
  );
}

export default App;
