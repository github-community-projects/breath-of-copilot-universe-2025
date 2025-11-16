# 🗡️ Legend of Zelda Monster Database ⚔️

A modern React-based web application featuring the dark creatures of Hyrule Kingdom, with a full JRPG-style adventure mode. Built with secure coding practices and a modern React ecosystem (React 18, Vite 4, React Router 6).

## 🎯 Features

### Monster Database 📚
- **Legend of Zelda themed interface** with dark, monster-filled design
- **Interactive monster gallery** with boss monsters and regular creatures
- **Search functionality** with secure parameterized queries
- **Boss monster filtering** for quick access to legendary foes
- **Security best practices** demonstrated throughout the codebase

### Adventure Mode ⚔️ (NEW!)
- **JRPG-style turn-based combat** inspired by classic RPGs
- **Level progression system** with experience points and stat increases
- **Random monster encounters** scaled to player level
- **Potion inventory** for healing during battles
- **Save/Load system** using browser localStorage
- **Strategic combat** with attack, potion use, and flee options
- **Victory rewards** with experience gain and level-up bonuses
- **Death penalty** with experience loss but full health restoration

## 🛡️ Security Status

**🐸 ALL SECURITY VULNERABILITIES FIXED! 🐸**

This application demonstrates security best practices:

### Security Improvements Implemented ✅

1. **SQL Injection Prevention**
   - **Fixed**: `/api/search` and `/api/monster/:id` endpoints
   - **Solution**: Parameterized queries with placeholders
   - **Impact**: Database is now protected from injection attacks
   - **Code**: All user inputs are passed as parameters, never concatenated

2. **Cross-Site Scripting (XSS) Prevention**
   - **Fixed**: Search results display in frontend
   - **Solution**: HTML entity encoding for all dynamic content
   - **Impact**: Malicious scripts can no longer execute in browsers
   - **Code**: All server data is escaped before DOM insertion

3. **Information Disclosure Prevention**
   - **Fixed**: Error messages and debug endpoints
   - **Solution**: Generic error messages, debug endpoint removed
   - **Impact**: System information no longer exposed to attackers
   - **Code**: No stack traces or query details in responses

4. **Input Validation**
   - **Added**: Length validation and type checking
   - **Solution**: Server-side validation for all inputs
   - **Impact**: Prevents various injection and malformed requests
   - **Code**: Query length limits, ID type validation

5. **Rate Limiting**
   - **Added**: Search endpoint rate limiting
   - **Solution**: 10 requests per minute per IP
   - **Impact**: Prevents brute force and DoS attacks
   - **Code**: Express rate limiting middleware

**🐸 SECURE AND READY FOR PRODUCTION!** 🔒

## 🏰 Quick Start

### Prerequisites
- Node.js (v20.19 or higher, or v22.12+)
- npm

### Installation & Development

1. **Clone and navigate to the repository**:
   ```bash
   git clone <repository-url>
   cd breath-of-copilot-universe-2025
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application** (runs both backend and frontend):
   ```bash
   npm start
   ```
   
   This will start:
   - Backend Express server on `http://localhost:3000`
   - React development server on `http://localhost:3001`

4. **Open your browser** and visit:
   ```
   http://localhost:3001
   ```

### Development Scripts

- `npm start` - Starts both backend and React dev server concurrently
- `npm run dev` - Starts only the React dev server (requires backend running separately)
- `npm run server` - Starts only the backend Express server
- `npm run server:dev` - Starts backend with nodemon (auto-reload on changes)
- `npm run build` - Builds the React app for production
- `npm run preview` - Preview the production build locally

### Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch. 

The deployment process:
- Builds the application on multiple platforms (Ubuntu, Windows) with different Node.js versions (20, 22)
- Installs dependencies
- Builds the application from the `src/` folder
- Creates artifact attestations for security and provenance
- Deploys static files to GitHub Pages

### Manual Build

To build the React application for production:
```bash
npm run build
```

This will create a `dist/` folder with optimized production files ready for deployment.

## 🎮 How to Use

### Monster Database Mode 🗡️

#### Navigation
- **All Monsters**: View all creatures in the database
- **Boss Monsters**: Filter to show only boss-level creatures
- **Search Database**: Search for specific monsters using the secure search endpoint

#### Features
- Click on monster cards to see detailed information
- Hover over cards for interactive animations
- Try the **Konami Code**: ↑↑↓↓←→←→BA for a special effect
- Watch for floating triforce elements in the background

### Adventure Mode ⚔️ (JRPG Game)

#### Getting Started
1. Click **"⚔️ Adventure Mode"** in the main navigation
2. Choose **"New Adventure"** to start fresh or **"Continue Adventure"** to load saved progress

#### Gameplay Loop
1. **Exploring Hyrule**: Your hub for managing your hero
   - View your stats (HP, Level, EXP, Power, Defense, Potions, Victories)
   - **Seek Battle**: Encounter a random monster (difficulty scales with your level)
   - **Rest**: Recover 30% of your HP between battles
   - **Reset Progress**: Start over with a new character

2. **Battle System**: Turn-based JRPG combat
   - **Attack**: Deal damage based on your Power vs enemy Defense
   - **Use Potion**: Restore 50% of your HP (limited supply)
   - **Flee**: 50% chance to escape without gaining experience
   
3. **Level Progression**:
   - Defeat monsters to gain experience points
   - Level up increases: Max HP (+20%), Power (+15%), Defense (+15%)
   - Gain an extra potion on level up (max 5)
   - Encounter stronger monsters as you level up

4. **Monster Tiers** (by player level):
   - **Level 1-3**: Keese, Bokoblin, Skulltula, Poe
   - **Level 4-6**: Skulltula, Poe, Moblin, Lynel, King Dodongo
   - **Level 7+**: Moblin, Lynel, King Dodongo, Dark Link, Ganondorf

5. **Death System**:
   - Losing a battle respawns you at full health
   - Lose 10% of your experience (but never lose a level)
   - No other penalties - keep fighting!

### Security Features in Action

1. **Secure Search**:
   - All queries use parameterized statements
   - Input validation prevents malicious queries
   - Try searching for "Ganon", "Dark Link", or "Lynel"

2. **Protected Endpoints**:
   - All API endpoints use secure coding practices
   - Rate limiting prevents abuse
   - Generic error messages protect system information

3. **XSS Protection**:
   - All dynamic content is HTML-escaped in React components
   - User input is sanitized before display
   - Server responses are validated

## 🗂️ File Structure

```
├── index.html          # Vite entry point
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx         # Main app with routing
│   ├── style.css       # Zelda-themed styling (original + game styles)
│   ├── server.js       # Node.js backend (secure with parameterized queries)
│   └── components/
│       ├── Header.jsx           # Header with Triforce of DevEx
│       ├── MonsterDatabase.jsx  # Original monster database functionality
│       ├── MonsterCard.jsx      # Individual monster card component
│       ├── SearchSection.jsx    # Secure search with XSS protection
│       ├── GameMode.jsx         # JRPG game controller and logic
│       ├── GameMenu.jsx         # Game start/load menu
│       ├── PlayerStats.jsx      # Player stats display panel
│       └── BattleScene.jsx      # Turn-based battle interface
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions deployment workflow
├── package.json        # Dependencies and scripts
├── monsters.db         # SQLite database (generated automatically)
└── README.md           # This file
```

## 🛠️ Technical Details

### Tech Stack
- **Frontend**: React 18 with hooks, React Router v6 for navigation
- **Build Tool**: Vite 5.x (fast HMR, optimized production builds)
- **Backend**: Node.js with Express 5
- **Database**: SQLite3 with secure parameterized queries
- **Styling**: Modern CSS with Zelda theme, responsive design
- **State Management**: React hooks (useState, useEffect) and localStorage for game saves

### Backend (Node.js + Express)
- SQLite database with monster information
- **Secure search endpoints** with parameterized queries
- **Input validation** on all user inputs
- **Rate limiting** to prevent abuse
- **Generic error messages** to prevent information disclosure
- RESTful API design

### Frontend (React)
- Modern React 18 with functional components and hooks
- React Router for client-side routing (Monster Database vs Adventure Mode)
- Component-based architecture for maintainability
- **Secure search results display** with HTML escaping in React components
- **XSS protection** through proper output encoding
- Responsive design with Zelda theme
- Interactive monster cards with hover effects
- Konami code easter egg
- localStorage for game save persistence
- Smooth animations and transitions

### Game Mechanics (Adventure Mode)
- Turn-based JRPG combat system
- Dynamic monster difficulty scaling
- Experience and leveling with stat progression
- Inventory system (potions)
- Battle damage calculations (Power vs Defense)
- Save/Load functionality
- Victory and defeat handling

### Security Implementations

| Security Feature | Implementation | Location | Benefit |
|-----------------|----------------|----------|---------|
| SQL Injection Prevention | Parameterized queries | `src/server.js` | Prevents database attacks |
| XSS Prevention | HTML entity encoding | React components | Prevents script injection |
| Input Validation | Length & type checks | `src/server.js` | Prevents malformed requests |
| Information Disclosure Prevention | Generic errors | `src/server.js` | Protects system information |
| Rate Limiting | Express middleware | `src/server.js` | Prevents DoS attacks |

## 🎓 Security Best Practices Demonstrated

This application demonstrates:
- **Parameterized SQL queries** to prevent injection attacks
- **HTML entity encoding in React** to prevent XSS attacks
- **Input validation** and sanitization
- **Generic error messages** to prevent information disclosure
- **Rate limiting** to prevent abuse and DoS attacks
- **Secure coding practices** throughout the codebase

## 🛡️ Security Implementation Examples

### 1. SQL Injection Prevention
**Before (Vulnerable):**
```javascript
const query = `SELECT * FROM monsters WHERE name LIKE '%${userInput}%'`;
db.all(query, callback);
```

**After (Secure):**
```javascript
const query = `SELECT * FROM monsters WHERE name LIKE ?`;
db.all(query, [`%${userInput}%`], callback);
```

### 2. XSS Prevention
**Before (Vulnerable):**
```javascript
searchResults.innerHTML = `<div>${serverData.name}</div>`;
```

**After (Secure):**
```javascript
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#039;'
    })[char]);
}
searchResults.innerHTML = `<div>${escapeHtml(serverData.name)}</div>`;
```

### 3. Input Validation
```javascript
// Validate query length
if (query.length > 100) {
    return res.status(400).json({ error: 'Query too long' });
}

// Validate ID is a number
const id = parseInt(req.params.id, 10);
if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid ID' });
}
```

### 4. Error Handling
**Before (Vulnerable):**
```javascript
res.status(500).json({ error: err.message, stack: err.stack });
```

**After (Secure):**
```javascript
console.error(err); // Log internally only
res.status(500).json({ error: 'An error occurred. Please try again.' });
```

## 📝 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

This is a secure web application project. Feel free to:
- Add more monsters to the database
- Enhance the Zelda theme
- Improve security features
- Add additional security best practices examples

Please ensure all contributions maintain the security standards demonstrated in this codebase.

---

**🐸 "Every bug caught is a step closer to a safer pond!"** 🔒

*Secured by FrogSecFixer with ribbiting attention to detail!* 🗡️
