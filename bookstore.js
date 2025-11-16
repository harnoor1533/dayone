const API_URL = "http://localhost:3000"; // JSON-server URL

// ------------------ LOAD BOOKS ------------------
async function loadBooks() {
  try {
    const res = await fetch(`${API_URL}/books`);
    const books = await res.json();

    const container = document.querySelector('.container');
    container.innerHTML = ''; // clear previous books

    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.dataset.id = book.id;

      bookDiv.innerHTML = `
        <div class="whishlist-icon"><i class="fas fa-heart"></i></div>
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <h4>by ${book.author}</h4>
        <p><span class="discount">₹${book.price + 100}</span> <span class="price">₹${book.price}</span></p>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
        </div>
        <button class="add-cart"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      `;
      container.appendChild(bookDiv);
    });

    attachListeners(); 
  } catch (err) {
    console.error("Error loading books:", err);
  }
}

// ------------------ ATTACH LISTENERS ------------------
function attachListeners() {
  setupWishlist();
  setupCart();
}

// ------------------ WISHLIST HANDLER ------------------
async function setupWishlist() {
  const hearts = document.querySelectorAll('.whishlist-icon i');
  const wishlistIcon = document.getElementById('whishlist-icon');

  // Create badge for wishlist count
  let countSpan = document.getElementById("wishlist-count");
  if (!countSpan) {
    countSpan = document.createElement("span");
    countSpan.id = "wishlist-count";
    countSpan.style.cssText = `
      background-color:red;
      color:white;
      border-radius:50%;
      padding:2px 6px;
      font-size:12px;
      position:absolute;
      top:0;
      right:-10px;
    `;
    wishlistIcon.parentElement.style.position = "relative";
    wishlistIcon.parentElement.appendChild(countSpan);
  }

  // Load wishlist
  const res = await fetch(`${API_URL}/wishlist`);
  const wishlist = await res.json();
  countSpan.innerText = wishlist.length;

  hearts.forEach(heart => {
    heart.addEventListener('click', async () => {
      const bookDiv = heart.closest('.book');
      const id = Number(bookDiv.dataset.id);
      const title = bookDiv.querySelector('h3').innerText;
      const price = Number(bookDiv.querySelector('.price').innerText.replace('₹','').trim());
      const image = bookDiv.querySelector('img').src;

      const wishRes = await fetch(`${API_URL}/wishlist`);
      const wishlistData = await wishRes.json();
      const exists = wishlistData.find(b => b.id === id);

      if (exists) {
        // Remove from wishlist
        await fetch(`${API_URL}/wishlist/${exists.id}`, { method: "DELETE" });
        heart.classList.remove('active');
        heart.style.color = 'gray';
      } else {
        // Add to wishlist
        await fetch(`${API_URL}/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, price, image })
        });
        heart.classList.add('active');
        heart.style.color = 'red';
      }

      // Update badge count
      const updatedRes = await fetch(`${API_URL}/wishlist`);
      const updatedWishlist = await updatedRes.json();
      countSpan.innerText = updatedWishlist.length;
    });
  });
}

// ------------------ CART HANDLER ------------------
async function setupCart() {
  const cartButtons = document.querySelectorAll('.add-cart');
  const cartIcon = document.querySelector('.fa-shopping-cart');

  // Create badge for cart count
  let cartCount = document.getElementById("cart-count");
  if (!cartCount) {
    cartCount = document.createElement('span');
    cartCount.id = "cart-count";
    cartCount.style.cssText = `
      background-color:red;
      color:white;
      border-radius:50%;
      padding:2px 6px;
      font-size:12px;
      position:absolute;
      top:0;
      right:-10px;
    `;
    cartIcon.parentElement.style.position = "relative";
    cartIcon.parentElement.appendChild(cartCount);
  }

  async function updateCartCount() {
    const res = await fetch(`${API_URL}/cart`);
    const cartItems = await res.json();
    cartCount.innerText = cartItems.length;
  }

  updateCartCount();

  cartButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const book = button.closest('.book');

      const id = Number(book.dataset.id);
      const title = book.querySelector('h3').innerText;
      const price = Number(book.querySelector('.price').innerText.replace('₹','').trim());
      const image = book.querySelector('img').src;

      const cartRes = await fetch(`${API_URL}/cart`);
      const cartItems = await cartRes.json();
      const existing = cartItems.find(item => item.id === id);

      if (!existing) {
        await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, title, price, image })
        });
        updateCartCount();
        alert(`${title} added to cart 🛒`);
      } else {
        alert(`${title} is already in cart.`);
      }
    });
  });
}











































































































































































































// ------------------ INITIAL CALL ------------------
loadBooks();
