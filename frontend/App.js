import React, { useState } from 'react';
import Homepage from './src/screens/Homepage';
import Onboarding from './src/screens/Onboarding';
import { getUser, isRegistered } from './src/data/userStore';

function App() {
  const [registered, setRegistered] = useState(isRegistered());

  const handleComplete = () => {
    setRegistered(true);
  };

  if (!registered) {
    return <Onboarding onComplete={handleComplete} />;
  }

  return <Homepage user={getUser()} />;
}

export default App;
