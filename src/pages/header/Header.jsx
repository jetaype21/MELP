import './header.css'
import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <nav>
        <h2 className='logo'><Link to={'/'}>MELP</Link></h2>
        <section className='h__right'>
          <Link to={'/about'}>About</Link>
          <Link to={'/contact'}>Contact</Link>
          <Link to={'/faqs'}>FAQs</Link>
        </section>
      </nav>
    </header>
  );
}

export default Header;
