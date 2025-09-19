# 🗡️ Legend of Zelda Monster Database ⚔️

A demo web application featuring the dark creatures of Hyrule Kingdom, built for educational purposes to demonstrate common web security vulnerabilities.

## 🎯 Features

- **Legend of Zelda themed interface** with dark, monster-filled design
- **Interactive monster gallery** with boss monsters and regular creatures
- **Search functionality** to find specific monsters
- **Intentional security vulnerabilities** for educational purposes
- **ASCII art deployment script** featuring Dark Link

## ⚠️ Security Warnings

**🚨 THIS APPLICATION CONTAINS INTENTIONAL VULNERABILITIES 🚨**

This demo includes the following vulnerabilities for educational purposes:

### 1. SQL Injection
- **Location**: `/api/search` and `/api/monster/:id` endpoints
- **Issue**: User input directly concatenated into SQL queries
- **Impact**: Database manipulation, data theft, data destruction
- **Example Attacks**:
  - `'; DROP TABLE monsters; --` 
  - `' OR '1'='1`

### 2. Cross-Site Scripting (XSS)
- **Location**: Search results display in frontend
- **Issue**: Unsanitized server data inserted directly into DOM
- **Impact**: Session hijacking, malicious script execution

### 3. Information Disclosure
- **Location**: Error messages and `/api/debug` endpoint
- **Issue**: Detailed error messages and system information exposed
- **Impact**: Assists attackers in reconnaissance

**DO NOT USE IN PRODUCTION ENVIRONMENTS**

## 🏰 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Deployment

1. **Clone and navigate to the repository**:
   ```bash
   git clone <repository-url>
   cd mbianchidev-eficode-universe-2025
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh

   # if there's a process already
   lsof -i tcp:3000
   kill -9 <PID>
   ```

3. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

The deployment script will:
- Show an ASCII art of Dark Link 🐲
- Install dependencies
- Verify all required files
- Display security warnings
- Start the server on localhost:3000

## 🎮 How to Use

### Navigation
- **All Monsters**: View all creatures in the database
- **Boss Monsters**: Filter to show only boss-level creatures
- **Search Database**: Search for specific monsters (vulnerable endpoint)

### Testing Vulnerabilities

1. **SQL Injection Testing**:
   - Go to Search Database
   - Try these payloads:
     - `'; DROP TABLE monsters; --`
     - `' OR '1'='1`
   - Visit: `http://localhost:3000/api/monster/1' OR '1'='1 --`

2. **Debug Information**:
   - Visit: `http://localhost:3000/api/debug`

3. **XSS Testing**:
   - If SQL injection succeeds, malicious scripts could be stored and executed

### Easter Eggs
- Try the **Konami Code**: ↑↑↓↓←→←→BA
- Click on monster cards for details
- Watch for floating triforce elements

## 🗂️ File Structure

```
├── index.html          # Main web page
├── style.css           # Zelda-themed styling
├── script.js           # Frontend JavaScript (contains XSS vulnerabilities)
├── server.js           # Node.js backend (contains SQL injection vulnerabilities)
├── package.json        # Dependencies
├── deploy.sh           # Build & deploy script with Dark Link ASCII art
├── monsters.db         # SQLite database (generated automatically)
└── README.md           # This file
```

## 🛠️ Technical Details

### Backend (Node.js + Express)
- SQLite database with monster information
- Vulnerable search endpoints
- Debug information exposure
- Detailed error message disclosure

### Frontend (HTML + CSS + JavaScript)
- Responsive Zelda-themed design
- Interactive monster cards
- Vulnerable search results display
- Konami code easter egg

### Vulnerabilities Summary

| Vulnerability | Location | Severity | Educational Value |
|---------------|----------|----------|-------------------|
| SQL Injection | Backend endpoints | Critical | High - Shows parameter injection risks |
| XSS | Frontend search display | High | High - Shows DOM manipulation risks |
| Info Disclosure | Error messages | Medium | Medium - Shows information leakage |
| Debug Endpoints | /api/debug | Medium | Medium - Shows development oversight risks |

## 🎓 Educational Purpose

This application demonstrates:
- Common web application vulnerabilities
- How SQL injection attacks work
- XSS attack vectors
- Information disclosure risks
- Secure coding practices (by showing what NOT to do)

## 🛡️ How to Fix These Vulnerabilities

1. **SQL Injection**: Use parameterized queries
   ```javascript
   db.all("SELECT * FROM monsters WHERE name LIKE ?", [`%${query}%`], callback)
   ```

2. **XSS**: Sanitize all user input and server responses
   ```javascript
   const sanitizedData = escapeHtml(serverResponse);
   ```

3. **Information Disclosure**: Use generic error messages
   ```javascript
   res.status(500).json({ error: "Internal server error" });
   ```

4. **Remove Debug Endpoints**: Don't expose system information in production

## 📝 License

MIT License - See LICENSE file for details.

## 🤝 Contributing

This is an educational project. Feel free to:
- Add more monsters
- Create additional vulnerability examples
- Improve the Zelda theme
- Add more secure coding examples

---

**Remember**: *"It's dangerous to go alone! Take this knowledge of security vulnerabilities with you."* 🗡️
