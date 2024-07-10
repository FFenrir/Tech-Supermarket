import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Laptops.css';


export function Laptops({ searchQuery ,onAddToCompare }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/store/laptops');
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
        return <div style={{textAlign:'center'}}>Loading...</div>;
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
                <ul>
                  <li>{product.screen_display_size}'' - {product.screen_resolution}p</li>
                  <li>CPU: {product.processor}</li>
                  <li>GPU: {product.graphics_processor}</li>
                  <li>RAM: {product.ram}</li>
                  <li>Storage: {product.hard_drive}</li>
                </ul>
              </div>
              <button className='compare-button' onClick={() => onAddToCompare({ ...product, category: 'Laptop' })}>Compare +</button>
              <button className='buy-button'><a href={product.product_link}>View at {product.store}</a></button>
            </div>
          ))}
        </div>
      );
}