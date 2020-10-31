import React from 'react';
import LandingPage from './landingPage/LandingPage.jsx';
import SwissController from './SwissController.jsx';
import BracketForm from './BracketForm.jsx';


const App = () => {
  return (
    <div>
      <LandingPage />
      <h1>Pogchamp</h1>
      <SwissController />
      <BracketForm />
    </div>
  );
}

export default App;