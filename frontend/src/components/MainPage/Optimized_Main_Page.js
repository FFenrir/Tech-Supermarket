import { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './MainPage.css'
//import { Laptops } from '../Laptops/Laptops';
import { GPUs } from '../Graphics_Cards/Graphics_Cards';
import { Laptops } from '../Laptops/Laptops';





export function ProductList() {
  /*const [products, setProducts] = useState([]);*/
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');



  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  const handleCategoryFilter = (category) => {
    if (category === 'All'| category === null) {
      setSelectedCategory(null); // Set the selected category to null to show all products
    } else {
      setSelectedCategory(category); // Update the selected category when a button other than "Show All" is clicked
    }
    setSearchQuery('');
  };


  /*const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;*/

  /*const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );*/  

  // Render different components or sections based on selectedCategory
  const renderProducts = () => {
    switch (selectedCategory) {
      case 'Laptops':
        return (
          <div style={{ marginTop: '5%' }}>
            <Laptops searchQuery={searchQuery}/>
          </div>
        );
      case 'Smartphones':
        return (
          <div>
            {/* Render components related to Smartphones */}
            <h2>Monitors</h2>
            {/* Example: <Smartphones /> component or section */}
          </div>
        );
      case 'PC_parts':
        return (
          <div style={{ marginTop: '5%' }}>
            <GPUs searchQuery={searchQuery}/>
          </div>
        );
      case 'Consoles':
        return (
          <div style={{ marginTop: '5%' }}>
            {/* Render components related to Consoles */}
            <h2>Consoles</h2>
          </div>
        );
      default:
        // Default case: Render all products or default section
        return (
          <div>
            <div className="mixed-products" style={{ marginTop: '5%' }}>
              <Laptops searchQuery={searchQuery}/>
              <GPUs searchQuery={searchQuery}/>
            </div>
          </div>
        );
    }
  };



return (
  <div>
    <title>BestDeals</title>
    <div className='menu-container'>
    <div className='top-menu'>
          <div className='search-bar-container'>
            <Search color='black' size={28}/>
            <input
              className='search-bar'
              type="text"
              placeholder="Search deals"
              name="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              style={{ paddingLeft: '40px' }} // Apply padding here
            />
          </div>
      <div className='authentication'>
        <Link className='log-in' to='/about'>About</Link> 
        <div className='logo'>Best<span>Deals</span></div>
        <a className='sign-up' href='https://www.google.com'><nobr>Contacts</nobr></a>
      </div>
      
    </div>
    
    <div className='filter-buttons'>
      <div className='laptop-filter' onClick={() => handleCategoryFilter('All')}>All Products</div>
      <div className='laptop-filter' onClick={() => handleCategoryFilter('Laptops')}>{/*<Laptop color="rgb(218, 154, 36)" size={27}/>*/}Laptops</div>
      <div className='laptop-filter' onClick={() => handleCategoryFilter('Smartphones')}>{/*<Display color="rgb(218, 154, 36)" size={27}/>*/}Displays</div>
      <div className='laptop-filter' onClick={() => handleCategoryFilter('PC_parts') }>{/*<GpuCard color="rgb(218, 154, 36)" size={27}/>*/}PC Components</div>
      <div className='laptop-filter' onClick={() => handleCategoryFilter('Consoles') }>{/*<GpuCard color="rgb(218, 154, 36)" size={27}/>*/}Consoles</div>
    </div>
    
    </div>
    <div className='products-container'>
    {renderProducts()}
    </div>
    {/*<div className='filter-buttons'>
        <button onClick={() => handleCategoryFilter('All')}>All</button>
        <button onClick={() => handleCategoryFilter('Laptops')}> <Laptop color="black" size={25} /> Laptops</button>
        <button onClick={() => handleCategoryFilter('Smartphones')}>Smartphones</button>
        <button onClick={() => handleCategoryFilter('TV')}>TV</button>
    </div>*/}
    </div>
  );
}