import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Welcome} from './components/Welcome_Page/Welcome_Page';
import { ProductList } from './components/MainPage/MainPage';
import { About } from './components/About/About';
import { SearchBar } from './components/SearchComponent/Search';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/store" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchBar />}/>
      </Routes>
    </Router>
  );
}
export default App