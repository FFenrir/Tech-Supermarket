import React, { useState, useEffect } from 'react';
import './Filters.css';

const ProductFilter = ({ productType, filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({});
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    // Initialize activeFilters based on the filters prop
    const initialFilters = {};
    Object.keys(filters).forEach(key => {
      initialFilters[key] = [];
    });
    setActiveFilters(initialFilters);

    // Initialize all sections as closed
    const initialOpenSections = {};
    Object.keys(filters).forEach(key => {
      initialOpenSections[key] = false;
    });
    setOpenSections(initialOpenSections);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const toggleSection = (filterType) => {
    setOpenSections(prevOpenSections => ({
      ...prevOpenSections,
      [filterType]: !prevOpenSections[filterType]
    }));
  };

  return (
    <div className="product-filter">
      <h2 className="product-filter__title">Filters</h2>
      {Object.entries(filters).map(([filterType, options]) => (
        <div className="product-filter__section" key={filterType}>
          <button 
            className="product-filter__section-header" 
            onClick={() => toggleSection(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            <span className={`product-filter__toggle-icon ${openSections[filterType] ? 'open' : ''}`}>
              ▼
            </span>
          </button>
          {openSections[filterType] && (
            <div className="product-filter__options">
              {options.map(option => (
                <label className="product-filter__option" key={option}>
                  <input
                    type="checkbox"
                    checked={activeFilters[filterType]?.includes(option)}
                    onChange={() => handleFilterChange(filterType, option)}
                  />
                  <span className="product-filter__option-label">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductFilter;