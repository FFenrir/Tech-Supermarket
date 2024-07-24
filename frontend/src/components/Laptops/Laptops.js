import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Laptops.css';



export function Laptops({ searchQuery, selectedStores = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <div className='product-info'>
                <img src={product.image} alt='product' />
                <h2>{product.name}</h2>
                <ul>
                  <li>{product.screen_display_size}'' - {product.screen_resolution}p</li>
                  <li>CPU: {product.processor}</li>
                  <li>GPU: {product.graphics_processor}</li>
                  <li>RAM: {product.ram}</li>
                  <li>Storage: {product.hard_drive}</li>
                </ul>
              </div>
              <button className='compare-button'>Compare +</button>
              <button className='buy-button'><a href={product.product_link}>View at {product.store}</a></button>
            </div>
          ))}
        </div>
      </div>  
    );
}