import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Hero from './Main/Hero';
import Product from './Main/Product';
import { useEffect } from 'react';



function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    
      <div className="App">
        
        <main>
          <Navbar />
          <Hero/>
          <Product />
        </main>
      </div>
    
  );
}

export default App;
