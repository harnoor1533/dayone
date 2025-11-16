import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

export default function BooksList() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")  // Fetch from db.json
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  return (
    <div>
      <h2>Books List</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12
      }}>
        {books.map(b => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
}

