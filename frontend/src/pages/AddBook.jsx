import React from 'react';
export default function AddBook() {
  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={(e)=>{ e.preventDefault(); alert('Form submit simulated'); }}>
        <div style={{ marginBottom:8 }}>
          <label>Title<br /><input name='title' type='text' required /></label>
        </div>
        <div style={{ marginBottom:8 }}>
          <label>Author<br /><input name='author' type='text' required /></label>
        </div>
        <div style={{ marginBottom:8 }}>
          <label>Price<br /><input name='price' type='number' required /></label>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}
