import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import {Welcome} from './components/Welcome_Page/Welcome_Page';
//import { ProductList } from './components/MainPage/Optimized_Main_Page';
import { MainPage } from './components/MainPage/MainPage';
import { About } from './components/About/About';
import { SearchBar } from './components/SearchComponent/Search';
import { Laptops } from './components/Laptops/Updated_Laptops';


function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Welcome />} />*/}
        <Route path="/*" element={< MainPage/>} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchBar />}/>
        <Route path="/updated" element={<Laptops/>}/>
      </Routes>
    </Router>
  );
}
export default App