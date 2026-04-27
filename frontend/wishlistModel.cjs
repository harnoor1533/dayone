const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String
});

module.exports = mongoose.model("Wishlist", wishlistSchema);