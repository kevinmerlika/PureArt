import React from 'react'
import '../Main/Product.scss'
import '../Data/Products'
import Products from '../Data/Products'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react'
import categories from '../Data/Categories'


function Product() {

  const [openItemId, setOpenItemId] = useState(null);

const handleClick = (id) => {
  setOpenItemId(openItemId === id ? null : id);
};

const [Category, setCategory] = useState(0)

const chooseCategory = (id) =>{
  setCategory(id === -1 ? -1 : id);
}

const handleAddToCart = (item) => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(item);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  window.postMessage({ type: 'CART_UPDATED', payload: cartItems });
    // Show banner
    const banner = document.getElementById('banner');
    banner.style.display = 'block';
  
    // Hide banner after 3 seconds
    setTimeout(() => {
      banner.style.display = 'none';
    }, 3000);
};
  
  return (

    <><div className='product__categories col-12'>
      
      <ul className='product__filter col-12'>
      {categories.map(item => (
        <a className='product__filter__link'><li key={item.name} className='product_filter-item' onClick={() => chooseCategory(item.id)} >
          {item.name}
        </li></a>
      
        ))} 
      </ul>
 
      <section className='product container col-11'>

      <div className='product__listcontainer col-12'>
      <ul className='product__list'>
      {Category === -1 ? 
  Products.map(item => (
    <a key={item.id} className='product__list-link'>
      <li className='product__list-item'>
        <div className='product__list-title'>{item.title}</div>
        <img className='product__list-image' src={item.url} onClick={() => handleClick(item.id)} />
        <div className='product__list-description col-12' onClick={() => handleClick(item.id)}>
          {item.description}
        </div>
        <div className='product__list-color' onClick={() => handleClick(item.id)}>{item.color}</div>
        <div className='product__list-price col-12' onClick={() => handleClick(item.id)}>
          {item.price} ALL
        </div>
        <div className={item.id === openItemId ? 'product__extra' : 'product__noextra'} onClick={() => handleAddToCart(item)}>
          {item.extra}
        </div>
      </li>
    </a>
  )) :
  Products.filter(item => item.category === Category).map(item => (
    <a key={item.id} className='product__list-link'>
      <li className='product__list-item'>
        <div className='product__list-title'>{item.title}</div>
        <img className='product__list-image' src={item.url} onClick={() => handleClick(item.id)} />
        <div className='product__list-description col-12' onClick={() => handleClick(item.id)}>
          {item.description}
        </div>
        <div className='product__list-color' onClick={() => handleClick(item.id)}>{item.color}</div>
        <div className='product__list-price col-12' onClick={() => handleClick(item.id)}>
          {item.price} ALL
        </div>
        <div className={item.id === openItemId ? 'product__extra' : 'product__noextra'} onClick={() => handleAddToCart(item)}>
          {item.extra}
        </div>
      </li>
    </a>
  ))
}
</ul>
      </div>
      <div id="banner">Produkti u Shtua</div>
    </section>
    </div>
    </>

      
  )
          };
export default Product