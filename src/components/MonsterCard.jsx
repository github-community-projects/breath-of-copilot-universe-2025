import React, { useState } from 'react';

function MonsterCard({ monster, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageStyle = {
    transform: isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0deg)',
    transition: 'transform 0.3s ease',
  };

  return (
    <div
      className={`monster-card ${monster.isBoss ? 'boss' : ''} defeated`}
      onClick={() => onClick(monster)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="monster-image" style={imageStyle}>
        {monster.emoji}
      </div>
      <h3>{monster.name}</h3>
      <p className="monster-type">{monster.type}</p>
      <p>{monster.description}</p>
      <div className="monster-stats">
        <span>⚡ Power: {monster.power}</span>
        <span>🛡️ Defense: {monster.defense}</span>
      </div>
    </div>
  );
}

export default MonsterCard;
