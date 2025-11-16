export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="cover-box">
        <img
          src={"/" + book.image}
          alt={book.title}
          style={{ width: "100%" }}
        />
      </div>

      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <p>₹{book.price}</p>

      <button>Add to cart</button>
    </div>
  );
}




