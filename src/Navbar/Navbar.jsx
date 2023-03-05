import React from 'react'
import './Navbar.scss'
import { useEffect,useState } from 'react';
import '../Style/grid.css'
import '../Data/Nav'
import nav from '../Data/Nav';
import Product from '../Main/Product';
import Receipt from '../Main/Recepit';

function Navbar() {


  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false)


  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  
  function removeAllItems() {
    console.log("deleted");
    localStorage.removeItem('cart');
    setCart([]);

  }

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  
    const handleMessage = (event) => {
      if (event.data.type === 'CART_UPDATED') {
        setCart(event.data.payload);
      }
    };
  
    window.addEventListener('message', handleMessage);
  
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleClick = () => {
    if(openCart === true){
       setOpenCart(!openCart)
    }
    setOpen(!open);
    
  };


  const cartClick = () => {
    if(open === true){
      setOpen(!open)
    }
    setOpenCart(!openCart)
    console.log(cart)

  }


  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    // Perform validation on the promo code
    if (promoCode === 'Pureart') {
      setDiscount(20/100); // Apply a 10% discount
    } else {
      setDiscount(0); // No discount applied
    }
    setPromoCode('');
  }

  const finalPrice = totalPrice - (totalPrice * discount)
  


 

  return (
    <><section className='navbar'>
      <div className='navbar__row container col-12'>
        <div className='navbar__logo col-2'>
          <img width={'60px'} height={'60px'} src='Assets/Logo.png' />
        </div>
        <div className='navbar__listcontainer col-6'>
          <ul className='navbar__list'>
          {nav.map(item => (
            <a  key={item.title} className='navbar__list-itemscontainer' href='/'><li className='navbar__list-items'>{item.title}</li></a>
          ))}
          </ul>
        </div>
        <div className='navbar__svg-container col-2 '>
          <a onClick={cartClick} className='navbar__svg'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" class="bi bi-cart" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" id="mainIconPathAttribute" stroke-width="0" stroke="#ff0000"></path> </svg>
          {cart.length > 0 ? (
      <span style={{color:"#9A5757", fontWeight:"600" ,fontSize:"20px"}}>{cart.length}</span>
    ) : null}
          </a>
        </div>
        <div className='navbar__burger-menu col-2' onClick={handleClick}>
          <span className={open ? "line line-1 open" : "line line-1"}></span>
          <span className={open ? "line line-2 open" : "line line-2"}></span>
          <span className={open ? "line line-3 open" : "line line-3"}></span>
        </div>
      </div>
    </section>
    
    <section className={open ? 'mobile-menu--opened' : 'mobile-menu--closed'}>
    <div className='mobile-menu--opened__container'>
      
    <ul className='mobile-menu--opened__list'>
  {nav.map(item => (
    <a key={item.title} className='mobile-menu--opened__list-link' >
      <li className='mobile-menu--opened__list-item'>{item.title}</li>
    </a>
  ))}
</ul>
    </div>
    </section>
    <div className={openCart ? 'cart__menu--opened': 'cart__menu--closed'}>
      <ul className='cart__menu--opened__list'>
      {cart.length > 0 ? (
      <button className='remove' onClick={() => removeAllItems()}>Clean</button>)
      : null}
      {cart.map((item, index) => (
  <li key={index} className='cart__menu--opened__item'>
    <div className='cart__menu--opened__card'>
    <div>{item.title}</div>
    <div>{item.description}</div>
    <div>{item.color}</div>
    <div>{item.price}</div>
    <span className='close' onClick={() => removeItem(index)}>X</span>
    </div>
    
  </li>
))}
      </ul>
      <div className='summary'>

      <div className='summary__total'>Total Price: {totalPrice} ALL</div>
      <form onSubmit={handleSubmit}>
      <label>
        Promo Code:
        <input type="password" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} />
      </label>
      <button className='apply' type="submit">APPLY</button>
      <p>Discount: 20%</p>
      <p>Final Price: ${finalPrice}</p>
    </form>
      <Receipt data={finalPrice}/>
    </div>
    </div>

      
      </>
  )
}


export default Navbar