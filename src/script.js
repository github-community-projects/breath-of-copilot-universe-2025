// Legend of Zelda Monster Database - Static Frontend JavaScript
// ⚠️ WARNING: This application contains INTENTIONAL SECURITY VULNERABILITIES ⚠️
// For educational purposes only!

document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let monstersData = [];
    
    // DOM Elements
    const showAllBtn = document.getElementById('showAll');
    const showBossesBtn = document.getElementById('showBosses');
    const showSearchBtn = document.getElementById('showSearch');
    const searchSection = document.getElementById('searchSection');
    const monsterGallery = document.getElementById('monsterGallery');
    const searchForm = document.getElementById('searchForm');
    const searchQuery = document.getElementById('searchQuery');
    const searchResults = document.getElementById('searchResults');
    const monstersGrid = document.getElementById('monstersGrid');

    // Load monster data on page load
    loadMonsterData();

    async function loadMonsterData() {
        try {
            const response = await fetch('monsters.json');
            monstersData = await response.json();
            displayAllMonsters();
        } catch (error) {
            console.error('Failed to load monster data:', error);
            monstersGrid.innerHTML = '<div class="error">Failed to load monsters from the database.</div>';
        }
    }

    // Display monsters in the gallery
    function displayAllMonsters() {
        monstersGrid.innerHTML = monstersData.map(monster => createMonsterCard(monster)).join('');
        addMonsterCardEvents();
    }

    // Display only boss monsters
    function displayBossMonsters() {
        const bossMonsters = monstersData.filter(monster => 
            monster.type.toLowerCase().includes('boss') || 
            monster.type.toLowerCase().includes('elite')
        );
        monstersGrid.innerHTML = bossMonsters.map(monster => createMonsterCard(monster)).join('');
        addMonsterCardEvents();
    }

    // Create HTML for a monster card
    function createMonsterCard(monster) {
        const isBoss = monster.type.toLowerCase().includes('boss') || 
                      monster.type.toLowerCase().includes('elite');
        return `
            <div class="monster-card ${isBoss ? 'boss' : ''}" data-type="${monster.type.toLowerCase()}">
                <div class="monster-image">${monster.emoji}</div>
                <h3>${monster.name}</h3>
                <p class="monster-type">${monster.type}</p>
                <p>${monster.description}</p>
                <div class="monster-stats">
                    <span>⚡ Power: ${monster.power}</span>
                    <span>🛡️ Defense: ${monster.defense}</span>
                </div>
            </div>
        `;
    }

    // Add event listeners to monster cards
    function addMonsterCardEvents() {
        const monsterCards = document.querySelectorAll('.monster-card');
        
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

            card.addEventListener('click', function() {
                const monsterName = this.querySelector('h3').textContent;
                const monsterType = this.querySelector('.monster-type').textContent;
                
                alert(`🗡️ You encountered ${monsterName}!\n\nType: ${monsterType}\n\n${this.querySelector('p:not(.monster-type)').textContent}`);
            });
        });
    }

    // Navigation functionality
    function setActiveTab(activeBtn) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function showAllMonsters() {
        displayAllMonsters();
        searchSection.classList.add('hidden');
        monsterGallery.style.display = 'block';
    }

    function showBossesOnly() {
        displayBossMonsters();
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

    // VULNERABLE SEARCH FUNCTION - Simulates SQL Injection and XSS vulnerabilities
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const query = searchQuery.value.trim();
        if (!query) return;

        console.log(`🔍 Search query received: "${query}"`);

        // Show loading state
        searchResults.innerHTML = '<div class="search-result">🔍 Searching the monster database...</div>';

        // Simulate server delay
        setTimeout(() => {
            performVulnerableSearch(query);
        }, 500);
    });

    function performVulnerableSearch(query) {
        /* 
        ⚠️ INTENTIONAL VULNERABILITY SIMULATION ⚠️
        
        This function simulates the SQL injection vulnerability that existed in the backend.
        While we can't actually perform SQL injection in a static site, we simulate
        the educational aspects of these attacks:
        
        1. Demonstrates how dangerous queries could work
        2. Shows XSS vulnerabilities through unsanitized output
        3. Provides educational examples of attack payloads
        */

        // Simulate SQL injection attack detection
        const sqlInjectionPatterns = [
            "'; DROP TABLE",
            "'; DELETE FROM",
            "'; UPDATE",
            "'; INSERT INTO",
            "' OR '1'='1",
            "' OR 1=1",
            "' UNION SELECT",
            "--",
            "/*",
            "*/"
        ];

        let isSqlInjection = false;
        let detectedPattern = '';
        
        for (const pattern of sqlInjectionPatterns) {
            if (query.toUpperCase().includes(pattern.toUpperCase())) {
                isSqlInjection = true;
                detectedPattern = pattern;
                break;
            }
        }

        if (isSqlInjection) {
            // Simulate SQL injection "attack" with educational response
            console.log(`💀 SQL Injection attempt detected: ${detectedPattern}`);
            
            /* 
            ⚠️ INTENTIONAL XSS VULNERABILITY ⚠️
            The following code demonstrates XSS by directly inserting user input
            */
            searchResults.innerHTML = `
                <div class="error">
                    <h3>🚨 SQL Injection Attack Detected! 🚨</h3>
                    <p><strong>Attack Pattern:</strong> ${detectedPattern}</p>
                    <p><strong>Your Query:</strong> ${query}</p>
                    <p><strong>Simulated SQL:</strong> SELECT * FROM monsters WHERE name LIKE '%${query}%'</p>
                    
                    <div class="vulnerability-demo">
                        <h4>💀 In a real application, this could:</h4>
                        <ul>
                            <li>Delete entire database tables</li>
                            <li>Steal sensitive user data</li>
                            <li>Bypass authentication</li>
                            <li>Modify database records</li>
                        </ul>
                        
                        <h4>🛡️ How to prevent:</h4>
                        <ul>
                            <li>Use parameterized queries</li>
                            <li>Validate and sanitize all inputs</li>
                            <li>Use stored procedures</li>
                            <li>Implement input whitelisting</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }

        // Check for XSS attempts
        const xssPatterns = ['<script>', '</script>', '<img', 'javascript:', 'onerror=', 'onload='];
        let hasXSS = false;
        
        for (const pattern of xssPatterns) {
            if (query.toLowerCase().includes(pattern.toLowerCase())) {
                hasXSS = true;
                break;
            }
        }

        if (hasXSS) {
            console.log(`⚠️ XSS attempt detected in query: ${query}`);
            
            /* 
            ⚠️ DEMONSTRATING XSS VULNERABILITY ⚠️
            In a real scenario, this would execute malicious scripts
            */
            searchResults.innerHTML = `
                <div class="error">
                    <h3>🚨 XSS Attack Detected! 🚨</h3>
                    <p><strong>Potentially malicious input:</strong> ${query}</p>
                    <p>This input contains HTML/JavaScript that could execute malicious code!</p>
                    
                    <div class="vulnerability-demo">
                        <h4>💀 XSS attacks can:</h4>
                        <ul>
                            <li>Steal cookies and session tokens</li>
                            <li>Redirect users to malicious sites</li>
                            <li>Deface websites</li>
                            <li>Steal sensitive form data</li>
                        </ul>
                    </div>
                </div>
            `;
            return;
        }

        // Perform normal search
        const results = monstersData.filter(monster => {
            return monster.name.toLowerCase().includes(query.toLowerCase()) ||
                   monster.type.toLowerCase().includes(query.toLowerCase()) ||
                   monster.description.toLowerCase().includes(query.toLowerCase());
        });

        if (results.length > 0) {
            /* 
            ⚠️ INTENTIONAL XSS VULNERABILITY ⚠️
            Direct innerHTML insertion without sanitization
            */
            searchResults.innerHTML = `
                <h3>Search Results for "${query}":</h3>
                ${results.map(monster => `
                    <div class="search-result">
                        <strong>${monster.emoji} ${monster.name}</strong><br>
                        <em>${monster.type}</em><br>
                        ${monster.description}<br>
                        <small>⚡ Power: ${monster.power}, 🛡️ Defense: ${monster.defense}</small>
                    </div>
                `).join('')}
                
                <div class="debug-info">
                    <small>🐛 Debug: Query executed at ${new Date().toISOString()}</small>
                </div>
            `;
        } else {
            searchResults.innerHTML = `
                <div class="search-result">
                    <strong>No monsters found matching "${query}"</strong><br>
                    Try searching for: Ganondorf, Dark Link, Lynel, Bokoblin, etc.<br><br>
                    <strong>Or try these vulnerability tests:</strong><br>
                    • <code>'; DROP TABLE monsters; --</code><br>
                    • <code>' OR '1'='1</code><br>
                    • <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>
                </div>
            `;
        }
    }

    // Simulate a debug endpoint
    window.debugMonsterDB = function() {
        /* 
        ⚠️ INFORMATION DISCLOSURE VULNERABILITY ⚠️
        Exposing system information that could help attackers
        */
        console.log({
            application: 'Hyrule Monster Database',
            version: '2.0.0 (Static)',
            totalMonsters: monstersData.length,
            vulnerabilities: [
                'Simulated SQL Injection in search function',
                'XSS via unsanitized search results',
                'Information disclosure via debug function',
                'Client-side data exposure'
            ],
            monsterData: monstersData,
            userAgent: navigator.userAgent,
            currentTime: new Date().toISOString()
        });
        
        alert('🐞 Debug information logged to console! Check developer tools.');
    };

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
    🗡️ Welcome to the Hyrule Monster Database v2.0 (Static Edition)! 🛡️
    
    ⚠️  SECURITY WARNING ⚠️
    This application contains intentional vulnerabilities:
    
    1. Simulated SQL Injection in the search function
    2. XSS vulnerability in search results display
    3. Information disclosure via debug functions
    4. Client-side data exposure
    
    These are for educational purposes only!
    
    Try these commands:
    • debugMonsterDB() - Shows debug information
    • Try the Konami Code: ↑↑↓↓←→←→BA
    
    Test these attack vectors:
    • '; DROP TABLE monsters; --
    • ' OR '1'='1
    • <script>alert('XSS')</script>
    `);
});

/* 
VULNERABILITY SUMMARY FOR STATIC VERSION:

1. SIMULATED SQL INJECTION:
   - Demonstrates what SQL injection attacks look like
   - Shows impact and prevention methods
   - Educational response to common attack patterns

2. XSS (Cross-Site Scripting):
   - Direct innerHTML assignment without sanitization (lines 237-250)
   - User input displayed without proper escaping
   - Potential for script injection through search results

3. INFORMATION DISCLOSURE:
   - Debug function exposes application details
   - Console logging reveals system information
   - Client-side data structure exposed

4. CLIENT-SIDE VULNERABILITIES:
   - All monster data exposed to client
   - No server-side validation simulation
   - Debug functions accessible via global scope

EDUCATIONAL VALUE:
- Shows common web vulnerabilities in action
- Demonstrates both attack vectors and prevention methods
- Provides hands-on learning about security issues
- Maintains educational purpose while being static
*/