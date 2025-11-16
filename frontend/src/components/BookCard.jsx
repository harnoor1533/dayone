import React from 'react';

export default function BookCard({ book }) {
  return (
    <article
      style={{
        border: '1px solid #ddd',
        padding: 12,
        borderRadius: 8,
        background: '#fff'
      }}
    >
      <div
        style={{
          height: 180,
          marginBottom: 8,
          overflow: 'hidden',
          borderRadius: 8,
          background: '#fafafa',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          src={book.image}
          alt={book.title}
          style={{ width: '100%', objectFit: 'cover' }}
        />
      </div>

      <h3 style={{ margin: '6px 0' }}>{book.title}</h3>
      <p style={{ margin: '6px 0', color: '#555' }}>by {book.author}</p>
      <p style={{ margin: '6px 0', fontWeight: 'bold' }}>₹{book.price}</p>

      <button
        style={{
          width: '100%',
          padding: '8px 0',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        Add to cart
      </button>
    </article>
  );
}

