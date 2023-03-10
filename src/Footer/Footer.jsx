import React from 'react'
import './Footer.scss'
import '../Data/Accordion'
import accordion from '../Data/Accordion'

function Footer() {
  return (
    <section className='footer-container container col-11'>

        <div className='footer col-12'>

            {accordion?.map((item) => (
            <div key={item.id} className='footer__categories col-3'>
                <div className='footer__title'>{item.title}<span className='footer__show'>+</span></div> 
                
                <ul className='footer__list'>
                {item.content.map((content, index) => (
                    <li key={index} className='footer__list-item'>{content}</li>
                    
                 ))} 
                </ul>
               
            </div>

            ))}
        </div>
    </section>
  )
}

export default Footer