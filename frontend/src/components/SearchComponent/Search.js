/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';
import './Search.css';

export function SearchBar({ searchQuery, setSearchQuery, setSearchResults }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery) {
        try {
          setLoading(true);
          const response = await axios.get(`/api/search?query=${searchQuery}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className='search-bar-container'>
      <Search color='black' size={22} onClick={handleSearchSubmit} style={{marginTop:"0.7%"}}/>
      <input
        className='search-bar'
        type="text"
        placeholder="Search deals"
        name="search"
        value={searchQuery}
        onChange={handleSearchInputChange}
        onClick={handleKeyPress}
        style={{ paddingLeft: '40px' }}
      />
      {loading && <div>Loading...</div>}
      <div className='suggestions'>
        {suggestions.map((suggestion, index) => (
          <div key={index} className='suggestion-item'>
            {suggestion.name}
          </div>
        ))}
      </div>
    </div>
  );
}*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';

export const SearchBar = ({ searchQuery, setSearchQuery, selectedStores, setSearchResults }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        try {
          setLoading(true);
          const response = await axios.get(`http://127.0.0.1:8000/store/search?query=${searchQuery}`);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/store/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    handleSearchSubmit();
  };

  return (
    <div className='search-bar-container'>
      <Search 
        color='black' 
        size={22} 
        onClick={handleSearchSubmit} 
        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
      />
      <input
        className='search-bar'
        type="text"
        placeholder={selectedStores.length ? `Search in ${selectedStores.join(', ')}...` : "Search deals"}
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        style={{ paddingLeft: '40px', width: '100%', height: '40px', borderRadius: '20px', border: '1px solid #ccc' }}
      />
      {loading && <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>Loading...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <div className='suggestions' style={{ 
          position: 'absolute', 
          top: '100%', 
          left: 0, 
          right: 0, 
          backgroundColor: 'white', 
          border: '1px solid #ccc', 
          borderTop: 'none', 
          borderRadius: '0 0 20px 20px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000
        }}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className='suggestion-item'
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};