import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';


function App() {
  
  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;