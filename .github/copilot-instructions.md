# GitHub Copilot Instructions for Legend of Zelda Monster Database

## Project Overview

This is an educational demo web application featuring the dark creatures of Hyrule Kingdom. The project is built with Node.js, Express, and SQLite, and intentionally includes security vulnerabilities for educational purposes.

**⚠️ CRITICAL: This application contains INTENTIONAL VULNERABILITIES for educational purposes. DO NOT use in production environments.**

## Tech Stack

- **Backend**: Node.js with Express framework
- **Database**: SQLite3
- **Frontend**: Vanilla JavaScript, HTML, CSS (Legend of Zelda themed)
- **Dev Tools**: nodemon for development

## Project Structure

```
├── server.js           # Backend server with intentional SQL injection vulnerabilities
├── script.js           # Frontend JavaScript with XSS vulnerabilities
├── index.html          # Main web page with Zelda theme
├── style.css           # Zelda-themed styling
├── scripts/deploy.sh   # Deployment script with Dark Link ASCII art
├── monsters.db         # SQLite database (auto-generated)
└── package.json        # Project dependencies
```

## Coding Standards

### General Guidelines

- Keep the Legend of Zelda theme consistent across all files
- Maintain the educational nature of intentional vulnerabilities
- Document security vulnerabilities clearly when they exist
- Use ASCII art and gaming aesthetics where appropriate

### JavaScript

- Use modern ES6+ syntax
- Prefer `const` and `let` over `var`
- Use arrow functions where appropriate
- Keep functions small and focused

### Node.js/Express

- Use async/await for asynchronous operations when possible
- Implement proper error handling
- Keep route handlers clean and readable

### Security Considerations

**This project intentionally includes the following vulnerabilities for educational purposes:**

1. **SQL Injection** - User input is directly concatenated into SQL queries
2. **Cross-Site Scripting (XSS)** - Unsanitized data inserted into DOM
3. **Information Disclosure** - Detailed error messages exposed
4. **Debug Endpoints** - System information exposed via `/api/debug`

When working on this project:
- **DO NOT** fix these vulnerabilities unless explicitly instructed
- **DO** document any new vulnerabilities added
- **DO** maintain clear warnings about the educational nature
- **DO** keep the vulnerable code patterns visible for learning

### Development Workflow

1. Install dependencies: `npm install` or use `./scripts/deploy.sh`
2. Start development server: `npm run dev` (uses nodemon)
3. Start production server: `npm start` or `node server.js`
4. Access the app at: `http://localhost:3000`

### Testing Vulnerabilities

To test the intentional vulnerabilities:

1. **SQL Injection**: Try search queries like `' OR '1'='1` or `'; DROP TABLE monsters; --`
   - ⚠️ **Note**: Destructive commands like `DROP TABLE` will permanently delete the database. The database auto-recreates on server restart, but you'll lose any custom data.
2. **Debug Info**: Visit `http://localhost:3000/api/debug`
3. **XSS**: Monitor for unsanitized data in search results

## API Endpoints

- `GET /` - Serve the main HTML page
- `GET /api/monsters` - Get all monsters
- `GET /api/monsters/boss` - Get boss monsters only
- `GET /api/search?q={query}` - Search monsters (vulnerable to SQL injection)
- `GET /api/monster/:id` - Get monster by ID (vulnerable to SQL injection)
- `GET /api/debug` - Debug endpoint (information disclosure)

## Dependencies

- `express` - Web framework
- `sqlite3` - Database driver
- `body-parser` - Parse request bodies
- `nodemon` - Development server with auto-reload (dev dependency)

## Important Notes

- The database is auto-generated on first run with Zelda monsters
- Port 3000 is used by default
- The deploy script includes interactive prompts and ASCII art
- Security warnings are displayed prominently in the UI and deployment

## Theme & Aesthetics

- Color scheme: Dark theme with purple, green, and gold accents
- Typography: Triforce-inspired design elements
- Interactive elements: Hover effects, floating triforces, Konami code easter egg
- ASCII art: Dark Link featured in deployment script

## When Adding Features

1. Maintain the Zelda theme and aesthetics
2. Keep the educational focus on security vulnerabilities
3. Add appropriate warnings for any new vulnerabilities
4. Update documentation in README.md
5. Test functionality manually (no automated test suite currently)

## When Fixing Issues

- Only fix security vulnerabilities if explicitly requested
- Preserve the educational nature of the codebase
- Maintain backwards compatibility with existing data
- Keep the theme and user experience consistent
