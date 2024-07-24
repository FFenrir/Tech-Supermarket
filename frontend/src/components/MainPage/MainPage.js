import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, FilterLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './MainPage.css'

import { GPUs } from '../Graphics_Cards/Graphics_Cards';
import { Laptops } from '../Laptops/Laptops';
import axios from 'axios';

const SearchBar = React.memo(({ searchQuery, setSearchQuery, selectedStores }) => (
  <div className='search-bar-container'>
    {/*<Search color='black' size={28}/>*/}
    <input
      className='search-bar'
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
    <div className='filter-container'>
      <button className='filter-button' onClick={() => setShowStoreDropdown(!showStoreDropdown)}>
        <FilterLeft size={28} color='royalblue'/> Stores
      </button>
      {showStoreDropdown && (
        <div className='store-dropdown'>
          <label>
            <input 
              type='checkbox' 
              onChange={toggleAllStores}
              checked={selectedStores.length === stores.length}
            />
            All Stores
          </label>
          {stores.map(store => (
            <label key={store}>
              <input 
                type='checkbox'
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

export function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);

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

  const handleCategoryFilter = useCallback((category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  }, []);

  const renderProducts = useMemo(() => {
    const commonProps = {
      searchQuery,
      selectedStores,
    };
  
    switch (selectedCategory) {
      case 'Laptops':
        return <Laptops {...commonProps} />;
      case 'PC_parts':
        return <GPUs {...commonProps} />;
      case 'Monitors':
        return <div>Monitors</div>
      case 'Consoles':
        return <div>Consoles</div>
      default:
        return (
          <div className="mixed-products">
            <Laptops {...commonProps} />
            <GPUs {...commonProps} />
          </div>
        );
    }
  }, [selectedCategory, searchQuery, selectedStores]);

  return (
    <div>
      <title>BestDeals</title>
      <div className='menu-container'>
        <div className='top-menu'>
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            selectedStores={selectedStores} 
          />
          <div className='authentication'>
            <Link className='log-in' to='/about'>About</Link> 
            <div className='logo'>Best<span>Deals</span></div>
            <a className='sign-up' href='https://www.google.com'>Contacts</a>
          </div>
        </div>
        
        <div className='filter-buttons'>
          <div className='laptop-filter' onClick={() => handleCategoryFilter('All')}>All Products</div>
          <div className='laptop-filter' onClick={() => handleCategoryFilter('Laptops')}>Laptops</div>
          <div className='laptop-filter' onClick={() => handleCategoryFilter('PC_parts')}>PC Components</div>
          <div className='laptop-filter' onClick={() => handleCategoryFilter('Monitors')}>Monitors</div>
          <div className='laptop-filter' onClick={() => handleCategoryFilter('Consoles')}>Consoles</div>
        </div>
      </div>
      <FilterMenu 
        stores={stores}
        selectedStores={selectedStores}
        setSelectedStores={setSelectedStores}
        showStoreDropdown={showStoreDropdown}
        setShowStoreDropdown={setShowStoreDropdown}
      />
      <div className='products-container'>
        {renderProducts}
      </div>
    </div>
  );
}