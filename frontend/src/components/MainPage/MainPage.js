import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes ,Route, Link, useNavigate } from 'react-router-dom';
import { Laptops } from '../Laptops/Laptops';
import { GPUs } from '../Graphics_Cards/Graphics_Cards';
import { AllProducts } from '../All_Products/All_Products';
import { FilterLeft } from 'react-bootstrap-icons'
import './MainPage.css';
import axios from 'axios';

const SearchBar = React.memo(({ searchQuery, setSearchQuery, selectedStores }) => (
  <div className="search-bar-container">
    <input
      className="search-bar"
      type="text"
      placeholder={selectedStores.length ? `Search in ${selectedStores.join(', ')}...` : "Search deals"}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ paddingLeft: '40px' }}
    />
  </div>
));

const FilterMenu = React.memo(({ stores, selectedStores, setSelectedStores, showStoreDropdown, setShowStoreDropdown }) => {
  const handleStoreFilter = useCallback((store) => {
    setSelectedStores(prev =>
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  }, [setSelectedStores]);

  const toggleAllStores = useCallback(() => {
    setSelectedStores(prev => prev.length === stores.length ? [] : [...stores]);
  }, [setSelectedStores, stores]);

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={() => setShowStoreDropdown(!showStoreDropdown)}>
        <FilterLeft size={28} color="royalblue" /> Stores
      </button>
      {showStoreDropdown && (
        <div className="store-dropdown">
          <label>
            <input
              type="checkbox"
              onChange={toggleAllStores}
              checked={selectedStores.length === stores.length}
            />
            All Stores
          </label>
          {stores.map(store => (
            <label key={store}>
              <input
                type="checkbox"
                onChange={() => handleStoreFilter(store)}
                checked={selectedStores.includes(store)}
              />
              {store}
            </label>
          ))}
        </div>
      )}
    </div>
  );
});

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/store/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <nav className="menu-container">
        <div className="top-menu">
          <div className="logo">Tech<span>Market</span></div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedStores={selectedStores} />
          <div className="authentication">
            <Link className="log-in" to="/about">About</Link>
            <a className="sign-up" href="https://www.google.com">Contacts</a>
          </div>
        </div>
        <div className="filter-buttons">
          <Link className="laptop-filter"  to="/store">All Products</Link>
          <Link className="laptop-filter"  to="/store/laptops">Laptops</Link>
          <Link className="laptop-filter"  to="/store/gpus">PC Components</Link>
          <Link className="laptop-filter"  to="/store/monitors">Monitors</Link>
          <Link className="laptop-filter"  to="/store/consoles">Consoles</Link>
        </div>
      </nav>
      
      <FilterMenu 
        stores={stores}
        selectedStores={selectedStores}
        setSelectedStores={setSelectedStores}
        showStoreDropdown={showStoreDropdown}
        setShowStoreDropdown={setShowStoreDropdown}
      />

      <Routes>
        <Route index element={<AllProducts searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="laptops" element={<Laptops searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="gpus" element={<GPUs searchQuery={searchQuery} selectedStores={selectedStores} />} />
        {/* Add routes for other categories as needed */}
      </Routes>
    </div>
  );
}
