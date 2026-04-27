import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Bookstore</h1>
      <p>Explore books, add them to your cart, and enjoy reading!</p>
      <Link to="/books">
        <button style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px' }}>
          Browse Books
        </button>
      </Link>
    </div>
  );
}
