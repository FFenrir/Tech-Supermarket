import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Consoles.css';

export function Consoles({ searchQuery, selectedStores = [] }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        brand: [],
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = 'http://127.0.0.1:8000/store/consoles';
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
        document.title = "TechMarket | Consoles"
    }, []);

    const updateFilterOptions = (products) => {
        const newFilters = {
            store: [...new Set(products.map(p => p.store))],
            brand: [...new Set(products.map(p => p.brand))],
        };
        setFilters(newFilters);
    };

    const [activeFilters, setActiveFilters] = useState({
        store: [],
        brand: [],
        storage: [],
        type: []
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
        <div className="console-layout-container">
            <div className="console-filters-section">
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
            <div className="console-consoles-container">
                {filteredProducts.map(product => (
                    <div className="console-card" key={product.id}>
                        <div className="console-productinfo">
                            <div className="console-productImage">
                                <img src={product.image} alt="product" />
                            </div>
                        </div>
                        <div className="console-productSpecifications">
                            <h1>{product.name}</h1>
                            <div className="console-productFeatures">
                                <div className="console-feature">
                                    <div className="console-featureIcon"></div>
                                    <div className="console-featureText">
                                        <p><strong>Brand</strong></p>
                                        <p>{product.brand}</p>
                                    </div>
                                </div>
                                <div className="console-feature">
                                    <div className="console-featureIcon"></div>
                                    <div className="console-featureText">
                                        <p><strong>Controller</strong></p>
                                        <p>{product.controller}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="console-checkoutButton">
                                <div className="console-priceTag">
                                    <span>$</span>{product.price}
                                </div>
                                <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <button className="console-preorder">
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