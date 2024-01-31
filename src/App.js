import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import Questionnaire from './components/Questionnaire';


function App() {
  
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;