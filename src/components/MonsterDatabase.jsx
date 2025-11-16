import React, { useState, useEffect, useRef } from 'react';
import MonsterCard from './MonsterCard';
import SearchSection from './SearchSection';

function MonsterDatabase() {
  const [activeTab, setActiveTab] = useState('all');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Load initial monster data (static for display)
  useEffect(() => {
    const initialMonsters = [
      { id: 1, name: 'Ganondorf', type: 'Boss Monster (Defeated)', description: 'The King of Darkness himself. His power corrupts all of Hyrule.', power: 100, defense: 95, emoji: '💀', isBoss: true },
      { id: 2, name: 'Dark Link', type: 'Shadow Boss (Defeated)', description: "Link's dark reflection, born from shadow and malice.", power: 90, defense: 85, emoji: '💀', isBoss: true },
      { id: 3, name: 'Lynel', type: 'Elite Monster (Defeated)', description: 'Centaur-like beasts with incredible strength and magical prowess.', power: 80, defense: 75, emoji: '💀', isBoss: false },
      { id: 4, name: 'King Dodongo', type: 'Fire Boss (Defeated)', description: 'A massive dinosaur-like creature that breathes fire and swallows bombs.', power: 70, defense: 80, emoji: '💀', isBoss: true },
      { id: 5, name: 'Poe', type: 'Ghost Monster (Defeated)', description: 'Ghostly spirits that carry lanterns and hunt in the darkness.', power: 40, defense: 10, emoji: '💀', isBoss: false },
      { id: 6, name: 'Skulltula', type: 'Arachnid Monster (Defeated)', description: 'Giant spiders that lurk in dark corners and abandoned places.', power: 35, defense: 15, emoji: '💀', isBoss: false },
      { id: 7, name: 'Bokoblin', type: 'Common Monster (Defeated)', description: 'Pig-faced creatures that serve Ganon with crude weapons.', power: 25, defense: 20, emoji: '💀', isBoss: false },
      { id: 8, name: 'Keese', type: 'Flying Monster (Defeated)', description: 'Demonic bats that swarm in caves and attack in groups.', power: 15, defense: 5, emoji: '💀', isBoss: false },
    ];
    setMonsters(initialMonsters);
    setFilteredMonsters(initialMonsters);
  }, []);

  // Filter monsters based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredMonsters(monsters);
    } else if (activeTab === 'bosses') {
      setFilteredMonsters(monsters.filter(m => m.isBoss));
    }
  }, [activeTab, monsters]);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.style.filter = 'hue-rotate(120deg)';
          alert('🎮 Konami Code activated! The monsters have been enchanted with green magic!');
          setTimeout(() => {
            document.body.style.filter = 'none';
            konamiIndex = 0;
          }, 5000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Floating triforce effect
  useEffect(() => {
    const activeIntervals = [];
    
    const createFloatingTriforce = () => {
      const triforce = document.createElement('div');
      triforce.innerHTML = '🔺';
      triforce.style.position = 'fixed';
      triforce.style.fontSize = '20px';
      triforce.style.color = '#ffd700';
      triforce.style.opacity = '0.3';
      triforce.style.pointerEvents = 'none';
      triforce.style.left = Math.random() * window.innerWidth + 'px';
      triforce.style.top = window.innerHeight + 'px';
      triforce.style.zIndex = '-1';
      
      document.body.appendChild(triforce);

      let position = window.innerHeight;
      const speed = 0.5 + Math.random() * 1;
      
      const float = setInterval(() => {
        position -= speed;
        if (triforce.parentNode) {
          triforce.style.top = position + 'px';
          triforce.style.transform = `rotate(${position * 0.1}deg)`;
        }
        
        if (position < -50) {
          clearInterval(float);
          if (triforce.parentNode) {
            document.body.removeChild(triforce);
          }
          const index = activeIntervals.indexOf(float);
          if (index > -1) {
            activeIntervals.splice(index, 1);
          }
        }
      }, 16);
      
      activeIntervals.push(float);
    };

    const interval = setInterval(createFloatingTriforce, 3000);
    
    return () => {
      clearInterval(interval);
      activeIntervals.forEach(intervalId => clearInterval(intervalId));
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'search') {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const handleMonsterClick = (monster) => {
    alert(`🗡️ You encountered ${monster.name}!\n\nType: ${monster.type}\n\n${monster.description}`);
  };

  return (
    <main>
      {/* Sub-navigation for database views */}
      <div className="sub-nav">
        <button 
          className={`nav-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All Monsters
        </button>
        <button 
          className={`nav-btn ${activeTab === 'bosses' ? 'active' : ''}`}
          onClick={() => handleTabChange('bosses')}
        >
          Boss Monsters
        </button>
        <button 
          className={`nav-btn ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => handleTabChange('search')}
        >
          Search Database
        </button>
      </div>

      {/* Search Section */}
      {showSearch && <SearchSection />}

      {/* Monster Gallery */}
      {!showSearch && (
        <section id="monsterGallery">
          <div className="monsters-grid">
            {filteredMonsters.map((monster) => (
              <MonsterCard 
                key={monster.id} 
                monster={monster} 
                onClick={handleMonsterClick}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default MonsterDatabase;
