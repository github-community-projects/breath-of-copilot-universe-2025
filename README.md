# 🗡️ Legend of Zelda Monster Database ⚔️

A demo web application featuring the dark creatures of Hyrule Kingdom, built for educational purposes to demonstrate common web security vulnerabilities. **Now deployed as a static site to GitHub Pages!**

## 🎯 Features

- **Legend of Zelda themed interface** with dark, monster-filled design
- **Interactive monster gallery** with boss monsters and regular creatures
- **Search functionality** to find specific monsters
- **Intentional security vulnerabilities** for educational purposes
- **Modern static deployment** via GitHub Actions to GitHub Pages
- **Responsive design** that works on desktop and mobile

## ⚠️ Security Warnings

**🚨 THIS APPLICATION CONTAINS INTENTIONAL VULNERABILITIES 🚨**

This demo includes the following vulnerabilities for educational purposes:

### 1. Simulated SQL Injection
- **Location**: Search functionality with educational responses
- **Issue**: Demonstrates how SQL injection attacks work
- **Impact**: Shows database manipulation possibilities
- **Example Attacks**:
  - `'; DROP TABLE monsters; --` 
  - `' OR '1'='1`

### 2. Cross-Site Scripting (XSS)
- **Location**: Search results display in frontend
- **Issue**: Unsanitized data inserted directly into DOM
- **Impact**: Potential for malicious script execution
- **Example**: Try searching for `<script>alert('XSS')</script>`

### 3. Information Disclosure
- **Location**: Debug functions and error messages
- **Issue**: System information exposed to users
- **Impact**: Assists attackers in reconnaissance
- **Access**: Run `debugMonsterDB()` in browser console

**DO NOT USE IN PRODUCTION ENVIRONMENTS**

## 🏰 Quick Start

### Prerequisites
- Modern web browser
- Git (for development)

### View the Live Demo
Visit the deployed application at: **[GitHub Pages Link](https://githubcustomers.github.io/mbianchidev-eficode-universe-2025/)**

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mbianchidev-eficode-universe-2025
   ```

2. **Build the static site**:
   ```bash
   ./build.sh
   ```

3. **Serve locally** (choose one method):
   ```bash
   # Using Python 3
   cd dist && python3 -m http.server 8000
   
   # Using Python 2
   cd dist && python -m SimpleHTTPServer 8000
   
   # Using npm script
   npm run serve
   ```

4. **Open your browser** and visit:
   ```
   http://localhost:8000
   ```

### Development Mode
For development, you can serve directly from the src directory:
```bash
npm run dev
```
Then visit: `http://localhost:3000`

## 🎮 How to Use

### Navigation
- **All Monsters**: View all creatures in the database
- **Boss Monsters**: Filter to show only boss-level creatures
- **Search Database**: Search for specific monsters (with vulnerability demos)

### Testing Vulnerabilities

1. **SQL Injection Testing**:
   - Go to Search Database
   - Try these educational payloads:
     - `'; DROP TABLE monsters; --`
     - `' OR '1'='1`
   - The system will show what these attacks would do in a real database

2. **XSS Testing**:
   - Try searching for: `<script>alert('XSS')</script>`
   - The app demonstrates how XSS vulnerabilities work

3. **Debug Information**:
   - Open browser developer console
   - Run: `debugMonsterDB()`
   - Observe the information disclosure

### Easter Eggs
- Try the **Konami Code**: ↑↑↓↓←→←→BA
- Click on monster cards for details
- Watch for floating triforce elements

## 🗂️ File Structure

```
├── src/                 # Source files
│   ├── index.html       # Main web page
│   ├── style.css        # Zelda-themed styling
│   ├── script.js        # Frontend JavaScript (contains vulnerabilities)
│   └── monsters.json    # Monster database (JSON format)
├── dist/                # Built static files (generated)
├── .github/workflows/   # GitHub Actions for deployment
│   └── deploy.yml       # Build and deploy workflow
├── build.sh             # Build script for static site generation
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🚀 Deployment

This application uses **GitHub Actions** to automatically build and deploy to **GitHub Pages** whenever changes are pushed to the main branch.

### Automated Deployment
- Push changes to the `main` branch
- GitHub Actions automatically runs the build process
- Static files are generated and deployed to GitHub Pages
- Live site is updated within minutes

### Manual Deployment
If you want to deploy to your own static hosting:
1. Run `./build.sh` to generate static files
2. Upload the contents of the `dist/` folder to your web server
3. Ensure your server can serve static files (HTML, CSS, JS, JSON)

## 🛠️ Technical Details

### Static Architecture
- **No Backend Server Required**: Pure client-side application
- **JSON Data Store**: Monster information stored in static JSON file
- **Simulated Vulnerabilities**: Educational demonstrations of security issues
- **GitHub Pages Compatible**: Fully static deployment

### Vulnerability Simulations
- **SQL Injection Demos**: Shows attack patterns and explains impact
- **XSS Vulnerabilities**: Real DOM manipulation risks
- **Info Disclosure**: Debug functions expose system information
- **Client-side Security**: Demonstrates frontend security considerations

### Vulnerabilities Summary

| Vulnerability | Location | Severity | Educational Value |
|---------------|----------|----------|-------------------|
| Simulated SQL Injection | Search function | Critical | High - Shows parameter injection risks |
| XSS | Frontend search display | High | High - Shows DOM manipulation risks |
| Info Disclosure | Console debug functions | Medium | Medium - Shows information leakage |
| Client-side Exposure | JSON data accessible | Low | Medium - Shows client-side security risks |

## 🎓 Educational Purpose

This application demonstrates:
- Common web application vulnerabilities in a safe environment
- How SQL injection attacks work (simulated)
- XSS attack vectors through DOM manipulation
- Information disclosure risks
- Client-side security considerations
- Modern static site deployment practices

## 🛡️ How to Fix These Vulnerabilities

1. **SQL Injection**: Use parameterized queries
   ```javascript
   // Instead of: `SELECT * FROM monsters WHERE name LIKE '%${query}%'`
   db.all("SELECT * FROM monsters WHERE name LIKE ?", [`%${query}%`], callback)
   ```

2. **XSS**: Sanitize all user input and escape output
   ```javascript
   // Instead of: element.innerHTML = userInput
   element.textContent = userInput; // or use proper HTML escaping
   ```

3. **Information Disclosure**: Use generic error messages
   ```javascript
   // Instead of: res.json({ error: err.message })
   res.status(500).json({ error: "Internal server error" });
   ```

4. **Client-side Security**: 
   - Validate data on both client and server
   - Don't expose sensitive information in client code
   - Use HTTPS in production
   - Implement Content Security Policy (CSP)

## 🔄 Migration from Node.js to Static

This project was migrated from a Node.js/Express backend to a static site:

### What Changed
- ✅ **Removed**: Node.js server, SQLite database, bash deployment script
- ✅ **Added**: Static JSON data file, GitHub Actions workflow, build script
- ✅ **Maintained**: All educational vulnerabilities and Zelda theming
- ✅ **Improved**: Faster loading, better scalability, easier deployment

### Why Static?
- **GitHub Pages Compatible**: Free hosting with automatic deployment
- **Better Performance**: No server processing, just static file serving
- **Easier Maintenance**: No database or server to manage
- **Educational Focus**: Vulnerability demonstrations work just as well
- **Modern Approach**: Follows current web development trends

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
