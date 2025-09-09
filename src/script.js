// Legend of Zelda Monster Database - Frontend JavaScript
// Static version for GitHub Pages deployment

// Static monster database for client-side search
const monsterDatabase = [
    { id: 1, name: 'Ganondorf', type: 'Boss Monster', description: 'The King of Darkness himself. His power corrupts all of Hyrule.', power: 100, defense: 95, emoji: '👹' },
    { id: 2, name: 'Dark Link', type: 'Shadow Boss', description: 'Link\'s dark reflection, born from shadow and malice.', power: 90, defense: 85, emoji: '🔗' },
    { id: 3, name: 'Lynel', type: 'Elite Monster', description: 'Centaur-like beasts with incredible strength and magical prowess.', power: 80, defense: 75, emoji: '👺' },
    { id: 4, name: 'King Dodongo', type: 'Fire Boss', description: 'A massive dinosaur-like creature that breathes fire and swallows bombs.', power: 70, defense: 80, emoji: '🐉' },
    { id: 5, name: 'Poe', type: 'Ghost Monster', description: 'Ghostly spirits that carry lanterns and hunt in the darkness.', power: 40, defense: 10, emoji: '👻' },
    { id: 6, name: 'Skulltula', type: 'Arachnid Monster', description: 'Giant spiders that lurk in dark corners and abandoned places.', power: 35, defense: 15, emoji: '🕷️' },
    { id: 7, name: 'Bokoblin', type: 'Common Monster', description: 'Pig-faced creatures that serve Ganon with crude weapons.', power: 25, defense: 20, emoji: '🧟' },
    { id: 8, name: 'Keese', type: 'Flying Monster', description: 'Demonic bats that swarm in caves and attack in groups.', power: 15, defense: 5, emoji: '🦇' }
];

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const showAllBtn = document.getElementById('showAll');
    const showBossesBtn = document.getElementById('showBosses');
    const showSearchBtn = document.getElementById('showSearch');
    const searchSection = document.getElementById('searchSection');
    const monsterGallery = document.getElementById('monsterGallery');
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');
    const monsterCards = document.querySelectorAll('.monster-card');

    // Navigation functionality
    function setActiveTab(activeBtn) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function showAllMonsters() {
        monsterCards.forEach(card => card.style.display = 'block');
        searchSection.classList.add('hidden');
        monsterGallery.style.display = 'block';
    }

    function showBossesOnly() {
        monsterCards.forEach(card => {
            if (card.classList.contains('boss')) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        searchSection.classList.add('hidden');
        monsterGallery.style.display = 'block';
    }

    function showSearchInterface() {
        searchSection.classList.remove('hidden');
        monsterGallery.style.display = 'none';
        searchQuery.focus();
    }

    // Event listeners for navigation
    showAllBtn.addEventListener('click', () => {
        setActiveTab(showAllBtn);
        showAllMonsters();
    });

    showBossesBtn.addEventListener('click', () => {
        setActiveTab(showBossesBtn);
        showBossesOnly();
    });

    showSearchBtn.addEventListener('click', () => {
        setActiveTab(showSearchBtn);
        showSearchInterface();
    });

    // Utility function to prevent XSS attacks
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Client-side search functionality (static version)
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchQuery.value.trim().toLowerCase();
        if (!query) return;

        // Show loading state briefly for better UX
        searchResults.innerHTML = '<div class="search-result">🔍 Searching the monster database...</div>';
        
        setTimeout(() => {
            // Search through the static monster database
            const results = monsterDatabase.filter(monster => 
                monster.name.toLowerCase().includes(query) || 
                monster.type.toLowerCase().includes(query) ||
                monster.description.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                // Display search results
                searchResults.innerHTML = `
                    <h3>Search Results for "${escapeHtml(searchQuery.value)}":</h3>
                    ${results.map(monster => `
                        <div class="search-result">
                            <div class="monster-image">${monster.emoji}</div>
                            <strong>${escapeHtml(monster.name)}</strong><br>
                            <em>${escapeHtml(monster.type)}</em><br>
                            ${escapeHtml(monster.description)}<br>
                            <small>Power: ${monster.power}, Defense: ${monster.defense}</small>
                        </div>
                    `).join('')}
                `;
            } else {
                searchResults.innerHTML = `
                    <div class="search-result">
                        <strong>No monsters found matching "${escapeHtml(searchQuery.value)}"</strong><br>
                        Try searching for: Ganondorf, Dark Link, Lynel, Bokoblin, etc.
                    </div>
                `;
            }
        }, 300); // Brief delay to show loading state
    });

    // Monster card hover effects
    monsterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.monster-image');
            image.style.transform = 'scale(1.2) rotate(5deg)';
            image.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.monster-image');
            image.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add click effect for monster cards
        card.addEventListener('click', function() {
            const monsterName = this.querySelector('h3').textContent;
            const monsterType = this.querySelector('.monster-type').textContent;
            
            // Show monster details (could be expanded)
            alert(`🗡️ You encountered ${monsterName}!\n\nType: ${monsterType}\n\n${this.querySelector('p:not(.monster-type)').textContent}`);
        });
    });

    // Easter egg: Konami code detection
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated
                document.body.style.filter = 'hue-rotate(120deg)';
                alert('🎮 Konami Code activated! The monsters have been enchanted with green magic!');
                
                // Reset after 5 seconds
                setTimeout(() => {
                    document.body.style.filter = 'none';
                    konamiIndex = 0;
                }, 5000);
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Dynamic background effect
    function createFloatingTriforce() {
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
            triforce.style.top = position + 'px';
            triforce.style.transform = `rotate(${position * 0.1}deg)`;
            
            if (position < -50) {
                clearInterval(float);
                document.body.removeChild(triforce);
            }
        }, 16);
    }

    // Create floating triforces occasionally
    setInterval(createFloatingTriforce, 3000);

    // Console easter egg for developers
    console.log(`
    🗡️ Welcome to the Hyrule Monster Database! 🛡️
    
    ✨ Static Version - Deployed via GitHub Pages ✨
    This version runs entirely client-side with no server dependencies.
    
    Features:
    • Client-side monster search
    • XSS protection with HTML escaping
    • Static monster database
    
    Try the Konami Code: ↑↑↓↓←→←→BA
    `);
});

/* 
STATIC VERSION NOTES:
This version has been converted for GitHub Pages deployment:
1. Removed server dependencies (no more Express.js backend)
2. Added client-side search functionality
3. Implemented XSS protection with HTML escaping
4. Uses static monster database instead of SQLite
5. No longer contains intentional security vulnerabilities
*/