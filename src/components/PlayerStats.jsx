import React from 'react';

function PlayerStats({ player }) {
  const expPercentage = (player.exp / player.expToNext) * 100;
  const hpPercentage = (player.hp / player.maxHp) * 100;

  return (
    <div className="player-stats-panel">
      <h3>🗡️ {player.name} - Level {player.level}</h3>
      
      <div className="stat-bar">
        <div className="stat-label">
          <span>❤️ HP: {player.hp}/{player.maxHp}</span>
        </div>
        <div className="stat-bar-bg">
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
        <div className="stat-bar-bg">
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
