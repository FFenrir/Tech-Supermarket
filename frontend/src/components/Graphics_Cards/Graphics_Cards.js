import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Graphics_Cards.css';

export function GPUs({ searchQuery, onAddToCompare }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <button className='buy-button'><a href={product.product_link}>View at {product.store}</a></button>
        </div>
      ))}
    </div>
  );
}