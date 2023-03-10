import React from 'react'
import '../Main/Hero.scss'
import { Link, useLocation } from 'react-router-dom';


function Hero() {
  return (
    <section className='hero'>
        <div className='hero__container'>
            <img className='hero__image' src="https://c0.wallpaperflare.com/preview/931/435/726/craft-dovetail-woodworking.jpg" alt="" />
            <Link to={"/Produktet"}><button className='hero__button'>
                Shikoni Produktet
            </button>
            </Link>
        </div>
    </section>
  )
}

export default Hero