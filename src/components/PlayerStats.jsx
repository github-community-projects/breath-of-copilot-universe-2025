import React from 'react';

function PlayerStats({ player }) {
  const expPercentage = player.expToNext > 0 ? (player.exp / player.expToNext) * 100 : 0;
  const hpPercentage = player.maxHp > 0 ? (player.hp / player.maxHp) * 100 : 0;

  return (
    <div className="player-stats-panel">
      <h3>🗡️ {player.name} - Level {player.level}</h3>
      
      <div className="stat-bar">
        <div className="stat-label">
          <span>❤️ HP: {player.hp}/{player.maxHp}</span>
        </div>
        <div 
          className="stat-bar-bg" 
          role="progressbar" 
          aria-valuenow={player.hp} 
          aria-valuemin="0" 
          aria-valuemax={player.maxHp}
          aria-label="Health Points"
        >
          <div 
            className="stat-bar-fill hp-bar" 
            style={{ width: `${hpPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="stat-bar">
        <div className="stat-label">
          <span>⭐ EXP: {player.exp}/{player.expToNext}</span>
        </div>
        <div 
          className="stat-bar-bg" 
          role="progressbar" 
          aria-valuenow={player.exp} 
          aria-valuemin="0" 
          aria-valuemax={player.expToNext}
          aria-label="Experience Points"
        >
          <div 
            className="stat-bar-fill exp-bar" 
            style={{ width: `${expPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="stat-grid">
        <div className="stat-item">
          <span className="stat-icon">⚡</span>
          <span className="stat-value">Power: {player.power}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🛡️</span>
          <span className="stat-value">Defense: {player.defense}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💚</span>
          <span className="stat-value">Potions: {player.potions}</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🏆</span>
          <span className="stat-value">Victories: {player.victories}</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;
