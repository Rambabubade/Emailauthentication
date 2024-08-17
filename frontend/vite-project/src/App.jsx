import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailAuth from './components/EmailAuth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailAuth />} />
        <Route path="/home" element={<h1>Welcome to the Home Page!</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
