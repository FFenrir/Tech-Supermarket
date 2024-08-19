import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Updated_Laptops.css';

export function Laptops({ selectedStores = [] }) {
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

    const filteredProducts = products?.filter(product => {
        const matchesStore = selectedStores.length === 0 || selectedStores.includes(product.store);
        return matchesStore;
    });

    if (loading) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!products || products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className='layout-container'>
            <div className='filters-section'>
                <h2>Filters</h2>
                <input type='text' placeholder='Search by name' />
            </div>
            <div className='laptops-container'>
                {filteredProducts.map(product => (
                    <div className='laptop-card' key={product.id}>
                        <div className='productinfo'>
                            <div className='productImage'>
                                <img src={product.image} alt='product' />
                            </div>
                        </div>
                        <div className='productSpecifications'>
                            <h1>{product.name}</h1>
                            <div className='productFeatures'>
                                <div className='feature'>
                                    <div className='featureIcon'></div>
                                    <div className='featureText'>
                                        <p><strong>Screen</strong></p>
                                        <p>{product.screen_display_size}'' - {product.screen_resolution}p</p>
                                    </div>
                                </div>
                                <div className='feature'>
                                    <div className='featureIcon'></div>
                                    <div className='featureText'>
                                        <p><strong>CPU</strong></p>
                                        <p>{product.processor}</p>
                                    </div>
                                </div>
                                <div className='feature'>
                                    <div className='featureIcon'></div>
                                    <div className='featureText'>
                                        <p><strong>GPU</strong></p>
                                        <p>{product.graphics_processor}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='checkoutButton'>
                                <div className='priceTag'>
                                    <span>$</span>{product.price}
                                </div>
                                <button className='preorder'>
                                    <p>View at {product.store}</p>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
