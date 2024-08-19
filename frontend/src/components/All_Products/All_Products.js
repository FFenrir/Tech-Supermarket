import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './All_Products.css';

export function AllProducts({ searchQuery, selectedStores = [] }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        store: []
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = 'http://127.0.0.1:8000/store/all_products';
                const response = await axios.get(url);
                setProducts(response.data);
                console.log(response.data)
                setLoading(false);
                updateFilterOptions(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateFilterOptions = (products) => {
        const newFilters = {
            store: [...new Set(products.map(p => p.store))]
        };
        setFilters(newFilters);
    };

    const [activeFilters, setActiveFilters] = useState({
        store: []
    });

    const handleFilterChange = (filterType, value) => {
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType].includes(value)
                ? prevFilters[filterType].filter(item => item !== value)
                : [...prevFilters[filterType], value]
        }));
    };

    const filteredProducts = products.filter(product => {
        const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStore = activeFilters.store.length === 0 || activeFilters.store.includes(product.store);
        return matchesSearchQuery && matchesStore;
    });

    const renderProductDetails = (product) => {
        if ('screen_display_size' in product) {
            // This is a laptop
            return (
                <>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strorng>Screen</strorng></p>
                            <p>{product.screen_display_size}'' - {product.screen_resolution}p</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>CPU</strong></p>
                            <p>{product.processor}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>GPU</strong></p>
                            <p>{product.graphics_processor}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>RAM</strong></p>
                            <p>{product.ram}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Storage</strong></p>
                            <p>{product.hard_drive}</p>
                        </div>
                    </div>
                </>
            );
        } if ('base_clock_speed' in product) {
            // This is a GPU
            return (
                <>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Clock Speed</strong></p>
                            <p>{product.base_clock_speed}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Memory</strong></p>
                            <p>{product.memory_interface} {product.graphics_card_ram_size} VRAM</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Dimensions</strong></p>
                            <p>{product.item_dimensions}</p>
                        </div>
                    </div>
                </>
            );
        }
        if ('monitor_display_resolution' in product) {
            // This is a GPU
            return (
                <>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Screen size</strong></p>
                            <p>{product.monitor_display_size}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Scrren resolution</strong></p>
                            <p>{product.monitor_display_resolution}</p>
                        </div>
                    </div>
                    <div className="product-feature">
                        <div className="feature-icon"></div>
                        <div className="feature-text">
                            <p><strong>Refresh rate</strong></p>
                            <p>{product.monitor_display_refresh_rate}</p>
                        </div>
                    </div>
                </>
            );
        }

    };

    if (loading) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
console.log(products.image)
    return (
        <div className="all-products-layout-container">
            <div className="filters-section">
                <h2>Filters</h2>
                <div className="filter-group">
                    <h3>Store</h3>
                    {filters.store.map(store => (
                        <label key={store} className="filter-option">
                            <input
                                type="checkbox"
                                checked={activeFilters.store.includes(store)}
                                onChange={() => handleFilterChange('store', store)}
                            />
                            {store}
                        </label>
                    ))}
                </div>
            </div>
            <div className="products-container">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id}>
                        <div className="product-info">
                            <div className="product-image">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className='product-image' 
                                    />
                            </div>
                        </div>
                        <div className="product-specifications">
                            <h1>{product.name}</h1>
                            <div className="product-features">
                                {renderProductDetails(product)}
                            </div>
                            <div className="checkout-button">
                                <div className="price-tag">
                                    <span>$</span>{product.price}
                                </div>
                                <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <button className="view-at-store">
                                        <p>View at {product.store}</p>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}