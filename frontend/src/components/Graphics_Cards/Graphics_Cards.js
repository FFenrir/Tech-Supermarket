import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Graphics_Cards.css';

export function GPUs({ searchQuery, onAddToCompare ,selectedStores = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storeColors = {
    'Amazon': { backgroundColor: '#000000', color: '#FF9900' },
    'B&H': { backgroundColor: '#ED1C24', color: '#FFF200' },
    'Newegg': { backgroundColor: '#FF6600', color: '#000000' },
    'Best Buy': { backgroundColor: '#0046BE', color: '#FFFFFF' },
    'Walmart': { backgroundColor: '#0071CE', color: '#FFFFFF' },
    // Add more stores as needed
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/store/graphics_cards');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStore = selectedStores.length === 0 || selectedStores.includes(product.store);
    return matchesSearchQuery && matchesStore;
  });

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container'>
      {filteredProducts.map(product => (
        <div key={product.id} className='product-card'>
          <div className='product-info'>
            <img src={product.image} alt='product' />
            <h2>{product.name}</h2>
            <span>Specs</span>
            <ul>
              <li>Clock Speed: {product.base_clock_speed}</li>
              <li>VRAM: {product.memory_interface} {product.graphics_card_ram_size} </li>
              <li>Dimensions: {product.item_dimensions}</li>
            </ul>
          </div>
          <button className='compare-button' onClick={() => onAddToCompare({ ...product, category: 'GPU' })}>Compare +</button>
          <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                <button 
                  className='buy-button'
                  style={storeColors[product.store] || {}}
                >
                  View at {product.store}
                </button>
              </a>  
        </div>
      ))}
    </div>
  );
}