import React from 'react';

function GameMenu({ hasSavedGame, onNewGame, onLoadGame }) {
  return (
    <div className="game-menu">
      <div className="menu-container">
        <h2 className="menu-title">⚔️ Adventure Mode ⚔️</h2>
        <p className="menu-subtitle">A JRPG-style adventure through Hyrule</p>
        
        <div className="menu-description">
          <p>🗡️ Battle monsters across the land of Hyrule</p>
          <p>⭐ Gain experience and level up your hero</p>
          <p>💪 Increase your power and defense</p>
          <p>🏆 Defeat legendary bosses</p>
        </div>
        
        <div className="menu-buttons">
          <button className="menu-btn primary" onClick={onNewGame}>
            🆕 New Adventure
          </button>
          
          {hasSavedGame && (
            <button className="menu-btn" onClick={onLoadGame}>
              📂 Continue Adventure
            </button>
          )}
        </div>
        
        <div className="menu-info">
          <h4>How to Play:</h4>
          <ul>
            <li><strong>Seek Battle:</strong> Encounter random monsters</li>
            <li><strong>Attack:</strong> Deal damage to enemies</li>
            <li><strong>Use Potion:</strong> Restore 50% of your HP</li>
            <li><strong>Flee:</strong> Attempt to escape (50% chance)</li>
            <li><strong>Rest:</strong> Recover 30% HP between battles</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GameMenu;
