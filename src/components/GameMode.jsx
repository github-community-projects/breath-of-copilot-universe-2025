import React, { useState, useEffect } from 'react';
import BattleScene from './BattleScene';
import PlayerStats from './PlayerStats';
import GameMenu from './GameMenu';

function GameMode() {
  const [gameState, setGameState] = useState('menu'); // menu, exploring, battle, victory, defeat
  const [player, setPlayer] = useState(null);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [gameMessage, setGameMessage] = useState('');

  // Available monsters for encounters
  const monsters = [
    { name: 'Keese', type: 'Flying Monster', power: 15, defense: 5, hp: 30, exp: 10, emoji: '🦇' },
    { name: 'Bokoblin', type: 'Common Monster', power: 25, defense: 20, hp: 50, exp: 20, emoji: '👹' },
    { name: 'Skulltula', type: 'Arachnid Monster', power: 35, defense: 15, hp: 60, exp: 30, emoji: '🕷️' },
    { name: 'Poe', type: 'Ghost Monster', power: 40, defense: 10, hp: 45, exp: 35, emoji: '👻' },
    { name: 'Moblin', type: 'Large Monster', power: 55, defense: 45, hp: 100, exp: 50, emoji: '🐗' },
    { name: 'Lynel', type: 'Elite Monster', power: 80, defense: 75, hp: 200, exp: 100, emoji: '🦁' },
    { name: 'King Dodongo', type: 'Fire Boss', power: 70, defense: 80, hp: 250, exp: 150, emoji: '🐲' },
    { name: 'Dark Link', type: 'Shadow Boss', power: 90, defense: 85, hp: 300, exp: 200, emoji: '🗡️' },
    { name: 'Ganondorf', type: 'Boss Monster', power: 100, defense: 95, hp: 500, exp: 500, emoji: '👑' },
  ];

  // Initialize or load player
  useEffect(() => {
    const savedPlayer = localStorage.getItem('hyrule-player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
    }
  }, []);

  // Save player to localStorage
  useEffect(() => {
    if (player) {
      localStorage.setItem('hyrule-player', JSON.stringify(player));
    }
  }, [player]);

  const createNewPlayer = () => {
    const newPlayer = {
      name: 'Link',
      level: 1,
      exp: 0,
      expToNext: 100,
      maxHp: 100,
      hp: 100,
      power: 20,
      defense: 10,
      potions: 3,
      victories: 0,
      deaths: 0,
    };
    setPlayer(newPlayer);
    setGameState('exploring');
    setGameMessage('🗡️ Your adventure begins! Explore the lands of Hyrule...');
  };

  const loadPlayer = () => {
    const savedPlayer = localStorage.getItem('hyrule-player');
    if (savedPlayer) {
      setPlayer(JSON.parse(savedPlayer));
      setGameState('exploring');
      setGameMessage('🗡️ Welcome back, hero! Your adventure continues...');
    }
  };

  const resetPlayer = () => {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone!')) {
      localStorage.removeItem('hyrule-player');
      setPlayer(null);
      setGameState('menu');
      setGameMessage('');
    }
  };

  const encounterMonster = () => {
    // Select a random monster based on player level
    const playerLevel = player.level;
    let availableMonsters;
    
    if (playerLevel <= 3) {
      availableMonsters = monsters.slice(0, 4); // Weaker monsters
    } else if (playerLevel <= 6) {
      availableMonsters = monsters.slice(2, 7); // Medium monsters
    } else {
      availableMonsters = monsters.slice(4); // Stronger monsters and bosses
    }
    
    const randomMonster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
    const enemy = { ...randomMonster, currentHp: randomMonster.hp };
    
    setCurrentEnemy(enemy);
    setGameState('battle');
    setBattleLog([`⚔️ A wild ${enemy.name} appeared!`]);
  };

  const calculateDamage = (attacker, defender) => {
    const baseDamage = attacker.power - Math.floor(defender.defense / 2);
    const variance = Math.floor(Math.random() * 10) - 5;
    return Math.max(1, baseDamage + variance);
  };

  const playerAttack = () => {
    if (!currentEnemy || gameState !== 'battle') return;

    const damage = calculateDamage(player, currentEnemy);
    const newEnemyHp = Math.max(0, currentEnemy.currentHp - damage);
    
    setBattleLog(prev => [...prev, `🗡️ You attack ${currentEnemy.name} for ${damage} damage!`]);
    
    const updatedEnemy = { ...currentEnemy, currentHp: newEnemyHp };
    setCurrentEnemy(updatedEnemy);

    if (newEnemyHp <= 0) {
      // Enemy defeated
      setTimeout(() => {
        victorySequence(updatedEnemy);
      }, 1000);
    } else {
      // Enemy counterattacks
      setTimeout(() => {
        enemyAttack(updatedEnemy);
      }, 1000);
    }
  };

  const enemyAttack = (enemy) => {
    const damage = calculateDamage(enemy, player);
    const newPlayerHp = Math.max(0, player.hp - damage);
    
    setBattleLog(prev => [...prev, `💀 ${enemy.name} attacks you for ${damage} damage!`]);
    
    setPlayer(prev => ({ ...prev, hp: newPlayerHp }));

    if (newPlayerHp <= 0) {
      setTimeout(() => {
        defeatSequence();
      }, 1000);
    }
  };

  const usePotion = () => {
    if (player.potions <= 0 || gameState !== 'battle') return;

    const healAmount = Math.floor(player.maxHp * 0.5);
    const newHp = Math.min(player.maxHp, player.hp + healAmount);
    
    setPlayer(prev => ({
      ...prev,
      hp: newHp,
      potions: prev.potions - 1
    }));
    
    setBattleLog(prev => [...prev, `💚 You used a potion and restored ${healAmount} HP!`]);
    
    // Enemy still attacks
    setTimeout(() => {
      enemyAttack(currentEnemy);
    }, 1000);
  };

  const flee = () => {
    if (gameState !== 'battle') return;

    const fleeChance = Math.random();
    if (fleeChance > 0.5) {
      setBattleLog(prev => [...prev, `💨 You successfully fled from ${currentEnemy.name}!`]);
      setTimeout(() => {
        setGameState('exploring');
        setCurrentEnemy(null);
        setBattleLog([]);
        setGameMessage('You escaped safely, but gained no experience.');
      }, 1500);
    } else {
      setBattleLog(prev => [...prev, `⚠️ You couldn't escape!`]);
      setTimeout(() => {
        enemyAttack(currentEnemy);
      }, 1000);
    }
  };

  const victorySequence = (defeatedEnemy) => {
    const expGained = defeatedEnemy.exp;
    const newExp = player.exp + expGained;
    let newLevel = player.level;
    let newExpToNext = player.expToNext;
    let leveledUp = false;

    // Check for level up
    if (newExp >= player.expToNext) {
      newLevel = player.level + 1;
      newExpToNext = Math.floor(player.expToNext * 1.5);
      leveledUp = true;
    }

    const updatedPlayer = {
      ...player,
      exp: newExp,
      level: newLevel,
      expToNext: newExpToNext,
      victories: player.victories + 1,
      hp: player.hp, // Keep current HP
    };

    // Stat increases on level up
    if (leveledUp) {
      updatedPlayer.maxHp = Math.floor(player.maxHp * 1.2);
      updatedPlayer.hp = Math.min(updatedPlayer.hp, updatedPlayer.maxHp);
      updatedPlayer.power = Math.floor(player.power * 1.15);
      updatedPlayer.defense = Math.floor(player.defense * 1.15);
      updatedPlayer.potions = Math.min(player.potions + 1, 5);
      
      setBattleLog(prev => [
        ...prev,
        `🎉 Victory! ${defeatedEnemy.name} has been defeated!`,
        `⭐ You gained ${expGained} EXP!`,
        `🎊 LEVEL UP! You are now level ${newLevel}!`,
        `📈 Max HP: ${player.maxHp} → ${updatedPlayer.maxHp}`,
        `⚡ Power: ${player.power} → ${updatedPlayer.power}`,
        `🛡️ Defense: ${player.defense} → ${updatedPlayer.defense}`,
      ]);
    } else {
      setBattleLog(prev => [
        ...prev,
        `🎉 Victory! ${defeatedEnemy.name} has been defeated!`,
        `⭐ You gained ${expGained} EXP! (${newExp}/${player.expToNext})`,
      ]);
    }

    setPlayer(updatedPlayer);
    
    setTimeout(() => {
      setGameState('exploring');
      setCurrentEnemy(null);
      setBattleLog([]);
      setGameMessage(leveledUp 
        ? `🎊 Congratulations! You reached level ${newLevel}!` 
        : '🎉 Victory! Ready for another battle?');
    }, 4000);
  };

  const defeatSequence = () => {
    setBattleLog(prev => [...prev, `💀 You have been defeated by ${currentEnemy.name}...`]);
    
    setPlayer(prev => ({
      ...prev,
      deaths: prev.deaths + 1,
      hp: prev.maxHp, // Full heal on respawn
      exp: Math.floor(prev.exp * 0.9), // Lose 10% exp
    }));
    
    setTimeout(() => {
      setGameState('exploring');
      setCurrentEnemy(null);
      setBattleLog([]);
      setGameMessage('💀 You were defeated, but you respawn at full health. Keep fighting!');
    }, 3000);
  };

  const rest = () => {
    const healAmount = Math.floor(player.maxHp * 0.3);
    const newHp = Math.min(player.maxHp, player.hp + healAmount);
    
    setPlayer(prev => ({
      ...prev,
      hp: newHp,
    }));
    
    setGameMessage(`😴 You rest and recover ${healAmount} HP. Current HP: ${newHp}/${player.maxHp}`);
  };

  return (
    <div className="game-mode">
      {gameState === 'menu' && (
        <GameMenu
          hasSavedGame={localStorage.getItem('hyrule-player') !== null}
          onNewGame={createNewPlayer}
          onLoadGame={loadPlayer}
        />
      )}

      {gameState === 'exploring' && player && (
        <div className="exploring-screen">
          <PlayerStats player={player} />
          
          <div className="game-container">
            <div className="game-message">
              <h2>🏞️ Exploring Hyrule</h2>
              <p>{gameMessage}</p>
            </div>
            
            <div className="action-buttons">
              <button className="action-btn primary" onClick={encounterMonster}>
                ⚔️ Seek Battle
              </button>
              <button className="action-btn" onClick={rest}>
                😴 Rest (Recover 30% HP)
              </button>
              <button className="action-btn danger" onClick={resetPlayer}>
                🔄 Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'battle' && player && currentEnemy && (
        <BattleScene
          player={player}
          enemy={currentEnemy}
          battleLog={battleLog}
          onAttack={playerAttack}
          onUsePotion={usePotion}
          onFlee={flee}
        />
      )}
    </div>
  );
}

export default GameMode;
