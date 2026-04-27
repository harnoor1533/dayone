const session = require("express-session");

const User = require("./userModel.cjs");
const bcrypt = require("bcrypt");

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
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: true
}));

// 🔹 Middleware (logging)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

/* ---------------- DB.JSON HELPERS ---------------- */

/* ---------------- ROUTES ---------------- */

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.send("User registered successfully ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error in signup");
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found ❌");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Wrong password ❌");
    }

    req.session.user = user;   // 🔥 store user in session
res.send("Login successful with session ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error in login");
  }
});

// root
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
app.get("/ssr-books", async (req, res) => {
  console.log("👉 SSR route hit");
  res.send("SSR WORKING");
});

app.get("/form", (req, res) => {
  console.log("👉 SSR Form opened");
  res.render("form");
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send("Welcome user: " + req.session.user.email);
  } else {
    res.send("Please login first ❌");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out successfully");
});

app.post("/submit", async (req, res) => {
  try {
    console.log("👉 Form Data:", req.body);

    const newBook = new Book(req.body);   // 🔥 create object
    await newBook.save();                 // 🔥 SAVE to MongoDB

    console.log("✅ Saved to MongoDB");

    res.send("Saved successfully");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving");
  }
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