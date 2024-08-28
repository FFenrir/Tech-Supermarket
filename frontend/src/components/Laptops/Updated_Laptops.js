import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Updated_Laptops.css';

export function Laptops({ searchQuery = '', selectedStores = [] }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        processor: [],
        ram: [],
        storage: [],
        gpu: []
    });

    const [showFilters, setShowFilters] = useState(false);  // State for toggling filter visibility

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = 'http://127.0.0.1:8000/store/laptops';
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
        document.title = "TechMarket | Laptops";
    }, []);

    const updateFilterOptions = (products) => {
        const newFilters = {
            store: [...new Set(products.map(p => p.store))],
            processor: [...new Set(products.map(p => p.processor))],
            ram: [...new Set(products.map(p => p.ram))],
            storage: [...new Set(products.map(p => p.hard_drive))],
            gpu: [...new Set(products.map(p => p.graphics_processor))]
        };
        setFilters(newFilters);
    };

    const [activeFilters, setActiveFilters] = useState({
        store: [],
        processor: [],
        ram: [],
        storage: [],
        gpu: []
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
        const matchesSearchQuery = searchQuery
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
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
        <div className="laptop-layout-container">
            <button className="hamburger-menu" onClick={() => setShowFilters(!showFilters)}>
                ☰ Filters
            </button>
            <div className={`laptop-filters-section ${showFilters ? 'show' : ''}`}>
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
            <div className={`laptop-laptops-container ${showFilters ? 'shifted-down' : ''}`}>
                {filteredProducts.map(product => (
                    <div className="laptop-card" key={product.id}>
                        <div className="laptop-productinfo">
                            <div className="laptop-productImage">
                                <img src={product.image} alt="product" />
                            </div>
                        </div>
                        <div className="laptop-productSpecifications">
                            <h1>{product.name}</h1>
                            <div className="laptop-productFeatures">
                                <div className="laptop-feature">
                                    <div className="laptop-featureIcon"></div>
                                    <div className="laptop-featureText">
                                        <p><strong>Screen</strong></p>
                                        <p>{product.screen_display_size}'' - {product.screen_resolution}p</p>
                                    </div>
                                </div>
                                <div className="laptop-feature">
                                    <div className="laptop-featureIcon"></div>
                                    <div className="laptop-featureText">
                                        <p><strong>CPU</strong></p>
                                        <p>{product.processor}</p>
                                    </div>
                                </div>
                                <div className="laptop-feature">
                                    <div className="laptop-featureIcon"></div>
                                    <div className="laptop-featureText">
                                        <p><strong>GPU</strong></p>
                                        <p>{product.graphics_processor}</p>
                                    </div>
                                </div>
                                <div className="laptop-feature">
                                    <div className="laptop-featureIcon"></div>
                                    <div className="laptop-featureText">
                                        <p><strong>RAM</strong></p>
                                        <p>{product.ram}</p>
                                    </div>
                                </div>
                                <div className="laptop-feature">
                                    <div className="laptop-featureIcon"></div>
                                    <div className="laptop-featureText">
                                        <p><strong>Storage</strong></p>
                                        <p>{product.hard_drive}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="laptop-checkoutButton">
                                <div className="laptop-priceTag">
                                    <span>$</span>{product.price}
                                </div>
                                <a href={product.product_link} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <button className="laptop-preorder">
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
