console.log("🔥 SERVER FILE RUNNING");
const Wishlist = require("./wishlistModel.cjs");
const Cart = require("./cartModel.cjs");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// 🔹 MongoDB Connection
mongoose.connect("mongodb://localhost:27017/bookstore")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔹 Import Model
const Book = require("./bookstoreModel.cjs");

const app = express();
app.set("view engine", "ejs"); 
app.use(express.json());
app.use(cors());

// 🔹 Middleware (logging)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

/* ---------------- DB.JSON HELPERS ---------------- */

/* ---------------- ROUTES ---------------- */

// root
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
app.get("/ssr-books", async (req, res) => {
  console.log("👉 SSR route hit");
  res.send("SSR WORKING");
});
/* ---------- MONGODB (BOOKS) ---------- */

// GET books (from MongoDB)
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    const formattedBooks = books.map(book => ({
      id: book._id.toString(),   // 🔥 important
      title: book.title,
      author: book.author,
      price: book.price
    }));

    res.json(formattedBooks);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching books" });
  }
});
// POST book (add to MongoDB)
app.post("/books", async (req, res) => {
  const newBook = await Book.create(req.body);
  res.json(newBook);
});



// GET wishlist (ADD THIS)
app.get("/test-wishlist", async (req, res) => {
  const item = new Wishlist({
    title: "Test Book",
    price: 123,
    image: "test.jpg"
  });

  await item.save();
  res.send("Added");
});


// POST wishlist
app.post("/wishlist", async (req, res) => {
  const newItem = new Wishlist(req.body);
  await newItem.save();
  res.json(newItem);
});

// DELETE wishlist
app.delete("/wishlist/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from wishlist" });
});
// ================= CART (MongoDB) =================

// GET cart
app.get("/cart", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

// POST cart
app.post("/cart", async (req, res) => {
  const newItem = new Cart(req.body);
  await newItem.save();
  res.json(newItem);
});

// DELETE cart
app.delete("/cart/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from cart" });
});
/* ---------- ERROR MIDDLEWARE ---------- */

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Something went wrong" });
});

/* ---------- SERVER ---------- */

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});