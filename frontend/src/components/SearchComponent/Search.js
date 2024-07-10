import React, { useState, useEffect } from 'react';
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
}