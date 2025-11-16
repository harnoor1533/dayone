import React from 'react';
export default function BookCard({ book }) {
  const title = book?.title ?? 'Sample Book';
  const price = book?.price ?? 199;
  return (
    <article style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <div style={{ height: 110, background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <span style={{ color: '#999' }}>Cover</span>
      </div>
      <h4 style={{ margin: '6px 0' }}>{title}</h4>
      <p style={{ margin: '6px 0' }}>₹{price}</p>
      <button>Add to cart</button>
    </article>
  );
}
