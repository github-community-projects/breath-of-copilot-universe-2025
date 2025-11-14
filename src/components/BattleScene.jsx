import React from 'react';
import PlayerStats from './PlayerStats';

function BattleScene({ player, enemy, battleLog, onAttack, onUsePotion, onFlee }) {
  const enemyHpPercentage = (enemy.currentHp / enemy.hp) * 100;

  return (
    <div className="battle-scene">
      <PlayerStats player={player} />
      
      <div className="battle-container">
        <div className="battle-arena">
          <div className="player-battle-info">
            <div className="battle-character player-character">
              <div className="character-emoji">🗡️</div>
              <div className="character-name">{player.name}</div>
            </div>
          </div>
          
          <div className="battle-vs">⚔️ VS ⚔️</div>
          
          <div className="enemy-battle-info">
            <div className="battle-character enemy-character">
              <div className="character-emoji">{enemy.emoji}</div>
              <div className="character-name">{enemy.name}</div>
              <div className="character-type">{enemy.type}</div>
            </div>
            
            <div className="enemy-hp-bar">
              <div className="stat-label">
                <span>HP: {enemy.currentHp}/{enemy.hp}</span>
              </div>
              <div className="stat-bar-bg">
                <div 
                  className="stat-bar-fill enemy-hp" 
                  style={{ width: `${enemyHpPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="enemy-stats">
              <span>⚡ Power: {enemy.power}</span>
              <span>🛡️ Defense: {enemy.defense}</span>
            </div>
          </div>
        </div>
        
        <div className="battle-log">
          <h4>⚔️ Battle Log</h4>
          <div className="battle-log-content">
            {battleLog.map((message, index) => (
              <div key={index} className="battle-log-message">
                {message}
              </div>
            ))}
          </div>
        </div>
        
        <div className="battle-actions">
          <button 
            className="action-btn primary" 
            onClick={onAttack}
            disabled={player.hp <= 0 || enemy.currentHp <= 0}
          >
            ⚔️ Attack
          </button>
          <button 
            className="action-btn" 
            onClick={onUsePotion}
            disabled={player.potions <= 0 || player.hp <= 0 || enemy.currentHp <= 0}
          >
            💚 Use Potion ({player.potions})
          </button>
          <button 
            className="action-btn danger" 
            onClick={onFlee}
            disabled={player.hp <= 0 || enemy.currentHp <= 0}
          >
            💨 Flee
          </button>
        </div>
      </div>
    </div>
  );
}

export default BattleScene;
