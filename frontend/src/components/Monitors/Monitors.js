import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Monitors.scss';

export function Monitors({ searchQuery, selectedStores = [] }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        brand: [],
        screen_size: [],
        resolution: [],
        refresh_rate: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = 'http://127.0.0.1:8000/store/monitors';
                const response = await axios.get(url);
                setProducts(response.data);
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
            store: [...new Set(products.map(p => p.store))],
            brand: [...new Set(products.map(p => p.brand))],
            screen_size: [...new Set(products.map(p => p.monitor_display_size))],
            resolution: [...new Set(products.map(p => p.monitor_display_resolution))],
            refresh_rate: [...new Set(products.map(p => p.monitor_display_refresh_rate))]
        };
        setFilters(newFilters);
    };

    const [activeFilters, setActiveFilters] = useState({
        store: [],
        brand: [],
        screen_size: [],
        resolution: [],
        refresh_rate: []
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
        const matchesStore = selectedStores.length === 0 || selectedStores.includes(product.store);
        const matchesFilters = Object.keys(activeFilters).every(filterType =>
            activeFilters[filterType].length === 0 || activeFilters[filterType].includes(product[filterType])
        );
        return matchesSearchQuery && matchesStore && matchesFilters;
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
        <div className="monitor-layout-container">
            <div className="monitor-filters-section">
                <h2>Filters</h2>
                {Object.entries(filters).map(([filterType, options]) => (
                    <div key={filterType} className="filter-group">
                        <h3>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                        {options.map(option => (
                            <label key={option} className="filter-option">
                                <input
                                    type="checkbox"
                                    checked={activeFilters[filterType].includes(option)}
                                    onChange={() => handleFilterChange(filterType, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
            </div>
            <div className="monitor-products-container">
                {filteredProducts.map(product => (
                    <div className="monitor-card" key={product.id}>
                        <div className="monitor-productinfo">
                            <div className="monitor-productImage">
                                <img src={product.image} alt="product" />
                            </div>
                        </div>
                        <div className="monitor-productSpecifications">
                            <h1>{product.name}</h1>
                            <div className="monitor-productFeatures">
                                <div className="monitor-feature">
                                    <div className="monitor-featureIcon"></div>
                                    <div className="monitor-featureText">
                                        <p><strong>Brand</strong></p>
                                        <p>{product.brand}</p>
                                    </div>
                                </div>
                                <div className="monitor-feature">
                                    <div className="monitor-featureIcon"></div>
                                    <div className="monitor-featureText">
                                        <p><strong>Screen Size</strong></p>
                                        <p>{product.monitor_display_size}"</p>
                                    </div>
                                </div>
                                <div className="monitor-feature">
                                    <div className="monitor-featureIcon"></div>
                                    <div className="monitor-featureText">
                                        <p><strong>Resolution</strong></p>
                                        <p>{product.monitor_display_resolution}</p>
                                    </div>
                                </div>
                                <div className="monitor-feature">
                                    <div className="monitor-featureIcon"></div>
                                    <div className="monitor-featureText">
                                        <p><strong>Refresh Rate</strong></p>
                                        <p>{product.monitor_display_refresh_rate}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="monitor-checkoutButton">
                                <div className="monitor-priceTag">
                                    <span>$</span>{product.price}
                                </div>
                                <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <button className="monitor-preorder">
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
