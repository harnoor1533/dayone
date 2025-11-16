import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <header style={{ padding: '12px 18px', background: '#e6ffe6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <h2 style={{ margin: 0 }}><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>My Bookstore</Link></h2>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to='/books'>Books</Link>
          <Link to='/add'>Add Book</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
