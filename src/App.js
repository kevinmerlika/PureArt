import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Hero from './Main/Hero';
import Products from './Main/Product';
import { useEffect } from 'react';
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





function App() {
  
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Products /></>} />
          <Route path="/Produktet" element={<Products />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
  }
export default App;
