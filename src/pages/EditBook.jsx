import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    Book(id: $id) {
      id
      title
      author
      price
      image
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!, $price: Float!, $image: String!) {
    updateBook(id: $id, data: { title: $title, author: $author, price: $price, image: $image }) {
      id
      title
    }
  }
`;

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id } });
  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: () => navigate('/books'),
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(''); // string is fine for input; we'll parseFloat on submit
  const [image, setImage] = useState('');

  useEffect(() => {
    if (data && data.Book) {
      setTitle(data.Book.title);
      setAuthor(data.Book.author);
      setPrice(data.Book.price);
      setImage(data.Book.image);
    }
  }, [data]);

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({
      variables: { id, title, author, price: parseFloat(price), image },
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Update Book
        </button>
      </form>
    </div>
  );
}
