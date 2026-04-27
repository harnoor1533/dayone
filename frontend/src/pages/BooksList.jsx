import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      price
      image
    }
  }
`;

export default function BooksList() {
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="books-list">
      {data.books.map((book) => (
        <div key={book.id} className="book-card">
          <img src={book.image} alt={book.title} width="150" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>${book.price}</p>
        </div>
      ))}
    </div>
  );
}
