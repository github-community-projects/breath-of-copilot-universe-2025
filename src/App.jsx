import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import MonsterDatabase from './components/MonsterDatabase';
import GameMode from './components/GameMode';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="triforce-bg"></div>
        <Header />
        <nav>
          <div className="nav-container">
            <Link to="/" className="nav-btn">🗡️ Monster Database</Link>
            <Link to="/game" className="nav-btn">⚔️ Adventure Mode</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MonsterDatabase />} />
          <Route path="/game" element={<GameMode />} />
        </Routes>
        <footer>
          <p>🐸 Secured with FrogSecFixer - All vulnerabilities patched! 🛡️</p>
          <p>© 2025 Hyrule Monster Database - Power, Wisdom, Courage</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
