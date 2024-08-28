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
        document.title = "TechMarket | All products"
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
        const features = [];
    
        const addFeature = (label, value) => {
            features.push(
                <div className="product-feature" key={label}>
                    <div className="feature-icon"></div>
                    <div className="feature-text">
                        <p><strong>{label}</strong></p>
                        <p>{value}</p>
                    </div>
                </div>
            );
        };
    
        switch (true) {
            case 'screen_display_size' in product:
                // This is a laptop
                addFeature('Screen', `${product.screen_display_size}'' - ${product.screen_resolution}p`);
                addFeature('CPU', product.processor);
                addFeature('GPU', product.graphics_processor);
                addFeature('RAM', product.ram);
                addFeature('Storage', product.hard_drive);
                break;
    
            case 'base_clock_speed' in product:
                // This is a GPU
                addFeature('Clock Speed', product.base_clock_speed);
                addFeature('Memory', `${product.memory_interface} ${product.graphics_card_ram_size} VRAM`);
                addFeature('Dimensions', product.item_dimensions);
                break;
    
            case 'monitor_display_resolution' in product:
                // This is a monitor
                addFeature('Screen size', product.monitor_display_size);
                addFeature('Screen resolution', product.monitor_display_resolution);
                addFeature('Refresh rate', product.monitor_display_refresh_rate);
                break;
            
            case 'controller' in product:
                // Console
                addFeature('Brand', product.brand);
                addFeature('Controller', product.controller);
                break


            default:
                return null;
        }
    
        return features;
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