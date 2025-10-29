// Legend of Zelda Monster Database - Frontend JavaScript

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

    // Search functionality with INTENTIONAL XSS VULNERABILITY
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const query = searchQuery.value.trim();
        if (!query) return;

        // Show loading state
        searchResults.innerHTML = '<div class="search-result">🔍 Searching the monster database...</div>';

        try {
            // Make request to vulnerable backend endpoint
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: query })
            });

            const data = await response.json();

            if (data.success && data.results.length > 0) {
                // VULNERABILITY: Direct insertion of unsanitized data from server
                // This allows for XSS attacks if the server returns malicious HTML
                searchResults.innerHTML = `
                    <h3>Search Results for "${query}":</h3>
                    ${data.results.map(monster => `
                        <div class="search-result">
                            <strong>${monster.name}</strong><br>
                            <em>${monster.type}</em><br>
                            ${monster.description}<br>
                            <small>Power: ${monster.power}, Defense: ${monster.defense}</small>
                        </div>
                    `).join('')}
                `;
            } else if (data.success && data.results.length === 0) {
                searchResults.innerHTML = `
                    <div class="search-result">
                        <strong>No monsters found matching "${query}"</strong><br>
                        Try searching for: Ganondorf, Dark Link, Lynel, Bokoblin, etc.
                    </div>
                `;
            } else {
                // VULNERABILITY: Server error messages displayed without sanitization
                searchResults.innerHTML = `
                    <div class="error">
                        Search failed: ${data.error || 'Unknown error'}
                    </div>
                `;
            }
        } catch (error) {
            searchResults.innerHTML = `
                <div class="error">
                    Network error: Could not reach the monster database server.
                    <br>Make sure the server is running on localhost.
                </div>
            `;
        }
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
    
    ⚠️  SECURITY WARNING ⚠️
    This application contains intentional vulnerabilities:
    
    1. SQL Injection in the search endpoint (/api/search)
    2. XSS vulnerability in search results display
    3. Unvalidated server error message display
    
    These are for educational purposes only!
    
    Try the Konami Code: ↑↑↓↓←→←→BA
    `);
});

/* 
VULNERABILITY SUMMARY:
1. XSS (Cross-Site Scripting): 
   - Line 85-97: Direct innerHTML assignment without sanitization
   - Server responses are inserted directly into the DOM
   - Malicious scripts in server responses will execute

2. Error Information Disclosure:
   - Line 105: Server error messages displayed without filtering
   - Could leak sensitive server information to attackers

3. Client-side Trust Issues:
   - The frontend trusts all data from the server
   - No client-side validation of server responses
   - Assumes server data is safe for DOM insertion
*/