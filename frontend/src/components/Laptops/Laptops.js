import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Laptops.css';



export function Laptops({ searchQuery, selectedStores = [] }) {
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
              const url = 'http://127.0.0.1:8000/store/laptops';
              const response = await axios.get(url);
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
        return <div style={{textAlign:'center'}}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
      <div>
        <div className='container'>
          {filteredProducts.map(product => (
            <div key={product.id} className='product-card'>
              <div className='product-image-container'>
                <img src={product.image} alt={product.name} className='product-image' />
              </div>
              <div className='separator'></div>
              <div className='product-info'>
                <h2>{product.name}</h2>
                <ul>
                  <li>{product.screen_display_size}'' - {product.screen_resolution}p</li>
                  <li>{product.processor} Processor</li>
                  <li>{product.graphics_processor} GPU</li>
                  <li>{product.ram} RAM</li>
                  <li>{product.hard_drive} Storage</li>
                </ul>
              </div>
              <div className='button-container'>
                <button className='compare-button'>Compare +</button>
                <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <button 
                    className='buy-button'
                    style={storeColors[product.store] || {}}
                  >
                    View at {product.store}
                  </button>
                </a>
              </div>  
            </div>
          ))}
        </div>
      </div>  
    );
}