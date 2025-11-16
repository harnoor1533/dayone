import React from 'react';
import BookCard from '../components/BookCard';
export default function BooksList() {
  const sample = [
    { id: '1', title: 'Intro to React', price: 250 },
    { id: '2', title: 'Learning JavaScript', price: 199 },
  ];
  return (
    <div>
      <h2>Books List</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
        {sample.map(b => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}
