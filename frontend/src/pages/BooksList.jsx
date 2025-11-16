import React, { useEffect, useState } from "react";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (book) => {
    if (!cart.find(item => item.id === book.id)) {
      setCart([...cart, book]);
      alert(`${book.title} added to cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  // Common styles
  const cardStyle = {
    width: "220px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.3s",
  };

  const cardHover = {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 14px rgba(0,0,0,0.15)"
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f5f6fa" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>Books List</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "25px",
        justifyContent: "center",
      }}>
        {books.length === 0 ? (
          <p>No books found</p>
        ) : (
          books.map(book => (
            <div 
              key={book.id} 
              style={cardStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
            >
              <img 
                src={book.image} 
                alt={book.title} 
                style={{ 
                  width: "100%", 
                  height: "180px", 
                  objectFit: "cover", 
                  borderRadius: "8px" 
                }}
                onError={(e) => { e.target.src = "placeholder.jpg"; }}
              />

              <h3 style={{ margin: "12px 0 6px", fontSize: "16px" }}>{book.title}</h3>
              <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>{book.author}</p>

              <p style={{ fontWeight: "bold", marginTop: "5px", fontSize: "15px" }}>
                ₹{book.price}
              </p>

              <button 
                onClick={() => addToCart(book)}
                style={{
                  marginTop: "12px",
                  padding: "8px 12px",
                  width: "100%",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <h2>Cart</h2>
          <ul>
            {cart.map(item => (
              <li key={item.id}>{item.title} - ₹{item.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BooksList;







