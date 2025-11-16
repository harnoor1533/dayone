import React from 'react';
import { useParams } from 'react-router-dom';
export default function EditBook() {
  const { id } = useParams();
  return (
    <div>
      <h2>Edit Book</h2>
      <p>Editing book id: <strong>{id}</strong></p>
    </div>
  );
}
