import React, { useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Laptops } from '../Laptops/Laptops';
import { GPUs } from '../Graphics_Cards/Graphics_Cards';
import { AllProducts } from '../All_Products/All_Products';
import { Monitors } from '../Monitors/Monitors';
import { Consoles } from '../Consoles/Consoles';
import { Display, Pc, Laptop, Grid, Playstation } from 'react-bootstrap-icons'

import './MainPage.css';


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


export function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStores, setSelectedStores] = useState('')

  return (
    <div>
      <nav className="menu-container">
        <div className="top-menu">  
          <div className="links">
            <Link className="about" to="/about">About</Link>
            <Link className="feedback" to="/feedback">Feedback</Link>
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedStores={selectedStores} />
        </div>
        <div className="filter-buttons">
          <Link className="laptop-filter" to="/"><Grid color='white' size={25}/> All Products</Link>
          <Link className="laptop-filter" to="/laptops"><Laptop color='white' size={25}/>Gaming Laptops</Link>
          <Link className="laptop-filter" to="/gpus"><Pc color='white' size={25}/>Desktops</Link>
          <Link className="laptop-filter" to="/monitors"><Display color='white' size={25}/>Monitors</Link>
          <Link className="laptop-filter" to="/consoles"><Playstation color='white' size={25}/> Consoles</Link>
        </div>
      </nav>

      

      <Routes>
        <Route index element={<AllProducts searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="laptops" element={<Laptops searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="gpus" element={<GPUs searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="monitors" element={<Monitors searchQuery={searchQuery} selectedStores={selectedStores} />} />
        <Route path="consoles" element={<Consoles searchQuery={searchQuery} selectedStores={selectedStores} />} />
        {/* Add routes for other categories as needed */}
      </Routes>
    </div>
  );
}
