# 🗡️ Legend of Zelda Monster Database ⚔️

A demo web application featuring the dark creatures of Hyrule Kingdom, built with secure coding practices.

## 🎯 Features

- **Legend of Zelda themed interface** with dark, monster-filled design
- **Interactive monster gallery** with boss monsters and regular creatures
- **Search functionality** with secure parameterized queries
- **Security best practices** demonstrated throughout the codebase
- **ASCII art deployment script** featuring Dark Link

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
- Node.js (v18 or higher)
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

3. **Start the server**:
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

### Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the main branch. 

The deployment process:
- Installs dependencies
- Builds the application from the `src/` folder
- Deploys static files to GitHub Pages

### Manual Build

To build the application manually:
```bash
npm run build
```

This will create a `dist/` folder with all the built files ready for deployment.

## 🎮 How to Use

### Navigation
- **All Monsters**: View all creatures in the database
- **Boss Monsters**: Filter to show only boss-level creatures
- **Search Database**: Search for specific monsters using the secure search endpoint

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
   - All dynamic content is HTML-escaped
   - User input is sanitized before display
   - Server responses are validated

### Easter Eggs
- Try the **Konami Code**: ↑↑↓↓←→←→BA
- Click on monster cards for details
- Watch for floating triforce elements

## 🗂️ File Structure

```
├── index.html          # Main web page
├── style.css           # Zelda-themed styling
├── script.js           # Frontend JavaScript (XSS protection with HTML escaping)
├── server.js           # Node.js backend (secure with parameterized queries)
├── package.json        # Dependencies and scripts
├── monsters.db         # SQLite database (generated automatically)
├── scripts/            # Deployment and utility scripts
└── README.md           # This file
```

## 🛠️ Technical Details

### Backend (Node.js + Express)
- SQLite database with monster information
- **Secure search endpoints** with parameterized queries
- **Input validation** on all user inputs
- **Rate limiting** to prevent abuse
- **Generic error messages** to prevent information disclosure

### Frontend (HTML + CSS + JavaScript)
- Responsive Zelda-themed design
- Interactive monster cards
- **Secure search results display** with HTML escaping
- **XSS protection** through proper output encoding
- Konami code easter egg

### Security Implementations

| Security Feature | Implementation | Location | Benefit |
|-----------------|----------------|----------|---------|
| SQL Injection Prevention | Parameterized queries | `server.js` | Prevents database attacks |
| XSS Prevention | HTML entity encoding | `script.js` | Prevents script injection |
| Input Validation | Length & type checks | `server.js` | Prevents malformed requests |
| Information Disclosure Prevention | Generic errors | `server.js` | Protects system information |
| Rate Limiting | Express middleware | `server.js` | Prevents DoS attacks |

## 🎓 Security Best Practices Demonstrated

This application demonstrates:
- **Parameterized SQL queries** to prevent injection attacks
- **HTML entity encoding** to prevent XSS attacks
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
