# 🗡️ Legend of Zelda Monster Database ⚔️

A static web application featuring the dark creatures of Hyrule Kingdom. This modernized version deploys automatically to GitHub Pages using GitHub Actions.

## 🎯 Features

- **Legend of Zelda themed interface** with dark, monster-filled design
- **Interactive monster gallery** with boss monsters and regular creatures  
- **Client-side search functionality** to find specific monsters
- **Static deployment** - runs entirely in the browser
- **Automatic GitHub Pages deployment** via GitHub Actions
- **Responsive design** that works on all devices

## 🚀 Deployment

This application automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Live Demo
Visit the deployed application: `https://githubcustomers.github.io/mbianchidev-eficode-universe-2025/`

### How it works
1. Code is pushed to the `main` branch
2. GitHub Actions workflow triggers automatically  
3. Static files from the `src/` directory are deployed to GitHub Pages
4. Application is available at the GitHub Pages URL

## 🏗️ Architecture

This is a **static web application** that runs entirely client-side:
- **No server required** - all functionality runs in the browser
- **Static monster database** - hardcoded data for fast performance
- **Client-side search** - JavaScript-based filtering and search
- **GitHub Pages compatible** - pure HTML/CSS/JavaScript

## 🗂️ File Structure

```
├── src/
│   ├── index.html          # Main web page
│   ├── style.css           # Zelda-themed styling  
│   └── script.js           # Client-side JavaScript
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment workflow
├── package.json            # Legacy dependencies (not used in static version)
├── server.js               # Legacy server (not used in static version)  
└── README.md               # This file
```

## 🎮 How to Use

### Navigation
- **All Monsters**: View all creatures in the database
- **Boss Monsters**: Filter to show only boss-level creatures
- **Search Database**: Search for specific monsters by name, type, or description

### Search Features
- Type any monster name (e.g., "Ganondorf", "Dark Link")
- Search by type (e.g., "Boss", "Ghost")
- Search by description keywords
- Instant client-side filtering

### Easter Eggs
- Try the **Konami Code**: ↑↑↓↓←→←→BA
- Click on monster cards for details
- Watch for floating triforce elements

## 🛠️ Local Development

To run locally for development:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mbianchidev-eficode-universe-2025
   ```

2. **Serve the static files**:
   ```bash
   cd src
   python3 -m http.server 8080
   # Or use any static file server
   ```

3. **Open your browser** and visit:
   ```
   http://localhost:8080
   ```

## 🔄 Migration from Server-based Version

This application was modernized from a Node.js server-based version to a static GitHub Pages deployment:

### What Changed
- ✅ **Removed bash deployment script** (`deploy.sh`)
- ✅ **Moved source files to `src/` directory**
- ✅ **Created GitHub Actions workflow** for automatic deployment
- ✅ **Converted to client-side search** (no more server API)
- ✅ **Added XSS protection** with HTML escaping
- ✅ **Removed server dependencies** (Express.js, SQLite, etc.)

### Legacy Files
The following files remain for reference but are not used in the static version:
- `server.js` - The old Node.js server
- `package.json` - Node.js dependencies
- `package-lock.json` - Dependency lockfile

## 📱 Browser Compatibility

Works in all modern browsers:
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Feel free to contribute:
- Add more monsters to the database
- Improve the search functionality
- Enhance the Zelda theme
- Add more interactive features

## 📝 License

MIT License - See LICENSE file for details.

---

**"It's dangerous to go alone! Take this modernized monster database with you."** 🗡️
