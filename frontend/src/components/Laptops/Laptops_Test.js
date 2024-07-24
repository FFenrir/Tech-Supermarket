import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Laptops.css';
import { FilterLeft } from 'react-bootstrap-icons';
import { FilterPanel } from '../Filter_Checkbox/Filter_Checkbox';
import { productFilters } from '../Filter_Checkbox/productFiltersConfig';

export function Laptops({ searchQuery, onAddToCompare, compareList }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addToCompareStatus, setAddToCompareStatus] = useState({});
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/store/laptops');
                const products = response.data;

                setProducts(products);
                setLoading(false);

                // Extract unique filter options
                const uniqueOptions = productFilters.laptops.reduce((options, filter) => {
                    const uniqueValues = [...new Set(products.map(product => product[filter.name]))];
                    options[filter.name] = uniqueValues;
                    return options;
                }, {});

                setFilterOptions(uniqueOptions);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
    };

    const filteredProducts = products
        .filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(product => 
            Object.keys(activeFilters).every(key => 
                activeFilters[key].length === 0 || activeFilters[key].includes(product[key])
            )
        );

    const handleAddToCompare = async (product) => {
        try {
            await onAddToCompare(product);
            setAddToCompareStatus(prev => ({ ...prev, [product.id]: 'Added' }));
            setTimeout(() => setAddToCompareStatus(prev => ({ ...prev, [product.id]: '' })), 1000);
        } catch (error) {
            console.error('Error adding to compare:', error);
            setAddToCompareStatus(prev => ({ ...prev, [product.id]: 'Error' }));
            setTimeout(() => setAddToCompareStatus(prev => ({ ...prev, [product.id]: '' })), 2000);
        }
    };

    if (loading) {
        return <div style={{textAlign:'center'}}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    
    return (
        <div>
            <button className='filter-button' onClick={() => setFiltersOpen(true)}>
                <FilterLeft size={28} color='royalblue'/> Filters
            </button>
            <FilterPanel
                productType="Laptops"
                filters={productFilters.laptops.map(filter => ({
                    ...filter,
                    options: filterOptions[filter.name] || []
                }))}
                onFilterChange={handleFilterChange}
                isOpen={filtersOpen}
                onClose={() => setFiltersOpen(false)}
            />
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
                        <button 
                            className='compare-button' 
                            onClick={() => handleAddToCompare(product)}
                            disabled={compareList?.some(item => item.id === product.id)}
                        >
                            {compareList?.some(item => item.id === product.id) 
                                ? 'In Compare' 
                                : addToCompareStatus[product.id] || 'Compare +'}
                        </button>
                        <button className='buy-button'>
                            <a href={product.product_link}>View at {product.store}</a>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
