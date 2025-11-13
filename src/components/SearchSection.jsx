import React, { useState } from 'react';

function SearchSection({ escapeHtml }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    setSearchResults(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
      });

      const data = await response.json();

      if (data.success && data.results.length > 0) {
        setSearchResults({
          success: true,
          query: query,
          results: data.results
        });
      } else if (data.success && data.results.length === 0) {
        setSearchResults({
          success: true,
          query: query,
          results: []
        });
      } else {
        setSearchResults({
          success: false,
          error: data.error || 'Unknown error'
        });
      }
    } catch (error) {
      setSearchResults({
        success: false,
        error: 'Network error: Could not reach the monster database server. Make sure the server is running on localhost.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="searchSection">
      <div className="search-container">
        <h2>🔍 Monster Search</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchQuery"
            placeholder="Enter monster name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button type="submit">Search Monsters</button>
        </form>
        
        <div id="searchResults">
          {isLoading && (
            <div className="search-result">
              🔍 Searching the monster database...
            </div>
          )}
          
          {searchResults && searchResults.success && searchResults.results.length > 0 && (
            <div>
              <h3>Search Results for "{escapeHtml(searchResults.query)}":</h3>
              {searchResults.results.map((monster, index) => (
                <div key={index} className="search-result">
                  <strong>{escapeHtml(monster.name)}</strong><br />
                  <em>{escapeHtml(monster.type)}</em><br />
                  {escapeHtml(monster.description)}<br />
                  <small>Power: {escapeHtml(String(monster.power))}, Defense: {escapeHtml(String(monster.defense))}</small>
                </div>
              ))}
            </div>
          )}
          
          {searchResults && searchResults.success && searchResults.results.length === 0 && (
            <div className="search-result">
              <strong>No monsters found matching "{escapeHtml(searchResults.query)}"</strong><br />
              Try searching for: Ganondorf, Dark Link, Lynel, Bokoblin, etc.
            </div>
          )}
          
          {searchResults && !searchResults.success && (
            <div className="error">
              Search failed: {escapeHtml(searchResults.error)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
