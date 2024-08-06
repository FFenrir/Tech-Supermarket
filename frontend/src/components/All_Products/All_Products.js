import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All_Products.css';  // You'll need to create this CSS file

export function AllProducts({ searchQuery, selectedStores = [] }) {
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
        const url = 'http://127.0.0.1:8000/store/all_products';
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

  const renderProductDetails = (product) => {
    if ('screen_display_size' in product) {
      // This is a laptop
      return (
        <ul>
          <li>{product.screen_display_size}'' - {product.screen_resolution}p</li>
          <li>{product.processor} Processor</li>
          <li>{product.graphics_processor} GPU</li>
          <li>{product.ram} RAM</li>
          <li>{product.hard_drive} Storage</li>
        </ul>
      );
    } else {
      // This is a GPU
      return (
        <ul>
          <li>Memory: {product.memory}</li>
          <li>Memory Interface: {product.memory_interface}</li>
          <li>Core Clock: {product.core_clock}</li>
          <li>Boost Clock: {product.boost_clock}</li>
        </ul>
      );
    }
  };

  return (
    <div>
      <div className='container'>
        {filteredProducts.map(product => (
          <div key={product.id} className='product-card'>
            <div className='product-image-container'>
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className='product-image' 
                onLoad={() => console.log(`Image loaded successfully for ${product.name}`)}
                onError={(e) => {
                  console.error(`Failed to load image for product: ${product.name}`);
                  console.error(`Image URL: ${product.image}`);
                  console.error(`Error details:`, e);
                  e.target.src = '/path/to/fallback/image.jpg'; // Replace with actual fallback image path
                  e.target.alt = 'Image not available';
                }}
              />
            ) : (
              <div className='no-image'>No image available</div>
            )}
            </div>
            <div className='separator'></div>
            <div className='product-info'>
              <h2>{product.name}</h2>
              {renderProductDetails(product)}
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