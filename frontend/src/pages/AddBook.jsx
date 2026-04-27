import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $price: Float!, $image: String!) {
    createBook(data: { title: $title, author: $author, price: $price, image: $image }) {
      id
      title
    }
  }
`;

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => navigate('/books'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, author, price: parseFloat(price), image } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
}