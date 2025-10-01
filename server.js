// Legend of Zelda Monster Database - Backend Server
// ⚠️ WARNING: This server contains INTENTIONAL SECURITY VULNERABILITIES ⚠️
// For educational purposes only!

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

// Initialize SQLite database
const dbPath = path.join(__dirname, 'monsters.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with monster data
function initializeDatabase() {
    db.serialize(() => {
        // Create monsters table
        db.run(`CREATE TABLE IF NOT EXISTS monsters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            power INTEGER NOT NULL,
            defense INTEGER NOT NULL,
            emoji TEXT NOT NULL
        )`);

        // Check if table is empty and populate it
        db.get("SELECT COUNT(*) as count FROM monsters", (err, row) => {
            if (!err && row.count === 0) {
                console.log('🏗️  Populating monster database...');
                
                const monsters = [
                    ['Ganondorf', 'Boss Monster', 'The King of Darkness himself. His power corrupts all of Hyrule.', 100, 95, '👹'],
                    ['Dark Link', 'Shadow Boss', 'Link\'s dark reflection, born from shadow and malice.', 90, 85, '🔗'],
                    ['Lynel', 'Elite Monster', 'Centaur-like beasts with incredible strength and magical prowess.', 80, 75, '👺'],
                    ['King Dodongo', 'Fire Boss', 'A massive dinosaur-like creature that breathes fire and swallows bombs.', 70, 80, '🐉'],
                    ['Poe', 'Ghost Monster', 'Ghostly spirits that carry lanterns and hunt in the darkness.', 40, 10, '👻'],
                    ['Skulltula', 'Arachnid Monster', 'Giant spiders that lurk in dark corners and abandoned places.', 35, 15, '🕷️'],
                    ['Bokoblin', 'Common Monster', 'Pig-faced creatures that serve Ganon with crude weapons.', 25, 20, '🧟'],
                    ['Keese', 'Flying Monster', 'Demonic bats that swarm in caves and attack in groups.', 15, 5, '🦇'],
                    ['Moblin', 'Large Monster', 'Massive pig-like creatures with clubs and spears.', 55, 45, '👹'],
                    ['Redead', 'Undead Monster', 'Zombie-like creatures that paralyze victims with their screams.', 30, 25, '🧟‍♂️'],
                    ['Gibdo', 'Mummy Monster', 'Mummified undead that shamble through ancient ruins.', 35, 30, '🧝‍♂️'],
                    ['Phantom Ganon', 'Phantom Boss', 'A ghostly projection of Ganondorf\'s power and malice.', 85, 70, '👤']
                ];

                const stmt = db.prepare("INSERT INTO monsters (name, type, description, power, defense, emoji) VALUES (?, ?, ?, ?, ?, ?)");
                monsters.forEach(monster => {
                    stmt.run(monster);
                });
                stmt.finalize();
                console.log('✅ Monster database populated successfully!');
            }
        });
    });
}

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// VULNERABLE ENDPOINT: SQL Injection vulnerability
app.post('/api/search', (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ success: false, error: 'Search query is required' });
    }

    console.log(`🔍 Search query received: "${query}"`);

    /* 
    ⚠️ INTENTIONAL SQL INJECTION VULNERABILITY ⚠️
    
    The following code is vulnerable to SQL injection because:
    1. User input is directly concatenated into the SQL query
    2. No parameterized queries or prepared statements are used
    3. No input sanitization or validation is performed
    
    An attacker could inject malicious SQL like:
    - "'; DROP TABLE monsters; --" to delete the database
    - "' OR '1'='1" to bypass search filters
    - "' UNION SELECT password FROM users --" to access other data
    
    SECURE VERSION WOULD USE: db.all("SELECT * FROM monsters WHERE name LIKE ?", [`%${query}%`], callback)
    */
    const vulnerableQuery = `SELECT * FROM monsters WHERE name LIKE '%${query}%' OR type LIKE '%${query}%' OR description LIKE '%${query}%'`;
    
    console.log(`💀 Executing vulnerable SQL query: ${vulnerableQuery}`);

    db.all(vulnerableQuery, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            
            /* 
            ⚠️ INTENTIONAL ERROR DISCLOSURE VULNERABILITY ⚠️
            
            Returning detailed error messages to the client can reveal:
            1. Database structure and schema information
            2. File paths and system information
            3. SQL query details that help attackers craft better attacks
            
            SECURE VERSION WOULD RETURN: Generic error message without details
            */
            return res.status(500).json({ 
                success: false, 
                error: `Database error: ${err.message}`,
                query: vulnerableQuery // Extra dangerous: revealing the actual query!
            });
        }

        /* 
        ⚠️ INTENTIONAL XSS VULNERABILITY ⚠️
        
        The server returns unsanitized data that gets inserted into the DOM.
        If an attacker manages to inject HTML/JavaScript into the database
        (via the SQL injection above), it will be served to other users.
        
        SECURE VERSION WOULD: Sanitize output data before sending to client
        */
        console.log(`✅ Found ${rows.length} monsters matching "${query}"`);
        
        res.json({
            success: true,
            results: rows,
            debug: {
                query: vulnerableQuery,
                timestamp: new Date().toISOString()
            }
        });
    });
});

// Additional vulnerable endpoint for demonstration
app.get('/api/monster/:id', (req, res) => {
    const { id } = req.params;
    
    /* 
    ⚠️ ANOTHER SQL INJECTION VULNERABILITY ⚠️
    Direct parameter insertion without validation
    */
    const vulnerableQuery = `SELECT * FROM monsters WHERE id = ${id}`;
    
    db.get(vulnerableQuery, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (!row) {
            return res.status(404).json({ error: 'Monster not found' });
        }
        
        res.json(row);
    });
});

// Debug endpoint that reveals too much information
app.get('/api/debug', (req, res) => {
    /* 
    ⚠️ INFORMATION DISCLOSURE VULNERABILITY ⚠️
    
    This endpoint reveals sensitive system information that could
    help attackers plan their attacks:
    */
    res.json({
        server: 'Node.js',
        database: 'SQLite',
        dbPath: dbPath,
        nodeVersion: process.version,
        platform: process.platform,
        environment: process.env,
        currentWorkingDirectory: process.cwd(),
        vulnerabilities: [
            'SQL Injection in /api/search',
            'SQL Injection in /api/monster/:id',
            'XSS via unsanitized database content',
            'Error message disclosure',
            'Debug information exposure'
        ]
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    /* 
    ⚠️ ERROR HANDLING VULNERABILITY ⚠️
    Revealing stack traces to users
    */
    res.status(500).json({
        error: 'Internal Server Error',
        stack: err.stack, // Don't do this in production!
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
    🗡️ ═══════════════════════════════════════════════════════════════ 🛡️
    
        🏰 HYRULE MONSTER DATABASE SERVER STARTED 🏰
        
        🌐 Server running at: http://localhost:${PORT}
        📊 Database: ${dbPath}
        
    ⚠️  SECURITY WARNING: This server contains intentional vulnerabilities! ⚠️
    
        🔓 Known Vulnerabilities:
        • SQL Injection in search endpoints
        • Cross-Site Scripting (XSS) potential
        • Information disclosure in error messages
        • Debug endpoint exposing sensitive data
        
        🎯 Try this attack vectors for educational purposes:
        • Search: '; DROP TABLE monsters; -- warning cannot roll back from this one!
        • Search: ' OR '1'='1
        
    🗡️ ═══════════════════════════════════════════════════════════════ 🛡️
    `);
    
    // Initialize the database
    initializeDatabase();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🏰 Shutting down Hyrule Monster Database...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('✅ Database connection closed.');
        }
        process.exit(0);
    });
});

/*
VULNERABILITY SUMMARY FOR EDUCATIONAL PURPOSES:

1. SQL INJECTION VULNERABILITIES:
   - Lines 67-74: Direct string concatenation in SQL queries
   - Lines 110-115: Parameter injection without validation
   - Impact: Database compromise, data theft, data destruction

2. CROSS-SITE SCRIPTING (XSS):
   - Lines 89-91: Unsanitized data sent to frontend
   - Frontend inserts this data directly into DOM
   - Impact: Session hijacking, malicious script execution

3. INFORMATION DISCLOSURE:
   - Lines 76-85: Detailed error messages with query info
   - Lines 125-140: Debug endpoint revealing system info
   - Lines 156-162: Stack trace exposure
   - Impact: Assists attackers in reconnaissance

4. INPUT VALIDATION:
   - Missing input sanitization and validation
   - No rate limiting or request size limits
   - Impact: Various injection attacks possible

HOW TO FIX THESE VULNERABILITIES:
1. Use parameterized queries: db.all("SELECT * FROM table WHERE col = ?", [userInput])
2. Sanitize all user inputs
3. Use generic error messages for users
4. Remove debug endpoints in production
5. Implement proper input validation
6. Add rate limiting and security headers
7. Use HTTPS in production
8. Implement proper authentication and authorization
*/
