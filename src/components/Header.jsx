import React from 'react';

function Header() {
  return (
    <header>
      <h1>🗡️ Hyrule Monster Database 🛡️</h1>
      <p className="subtitle">Explore the dark creatures of Hyrule Kingdom</p>
      
      {/* Triforce of DevEx */}
      <div className="triforce-devex">
        <h2 className="triforce-title">⚔️ The Triforce of DevEx ⚔️</h2>
        <div className="triforce-container">
          <div className="triforce-piece triforce-top">
            <div className="triforce-icon">💻</div>
            <div className="triforce-label">Copilot</div>
          </div>
          <div className="triforce-piece triforce-left">
            <div className="triforce-icon">🔒</div>
            <div className="triforce-label">Advanced Security</div>
          </div>
          <div className="triforce-piece triforce-right">
            <div className="triforce-icon">🤖</div>
            <div className="triforce-label">Actions</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
