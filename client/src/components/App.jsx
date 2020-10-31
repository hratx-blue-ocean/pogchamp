import React from 'react';
import LandingPage from './landingPage/LandingPage.jsx';
import SwissController from './SwissController.jsx';

import PopulateForm from './PopulateForm.jsx';

const App = () => {
  return (
    <div>
      <LandingPage />
      <h1>Pogchamp</h1>
      <SwissController />

      <PopulateForm />

      <BracketForm />

    </div>
  );
}

export default App;