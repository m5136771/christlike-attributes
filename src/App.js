import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import Questionnaire from './views/Questionnaire';
import ResultsView from './views/Results';


function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results" element={<ResultsView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;