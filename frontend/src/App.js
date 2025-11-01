import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VirtualTryOn from './pages/VirtualTryOn';
import Landing from './pages/Landing';
import Redirect from './pages/Redirect';
import DarkThemeEffects from './components/DarkThemeEffects';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <DarkThemeEffects />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tryon" element={<VirtualTryOn />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;

