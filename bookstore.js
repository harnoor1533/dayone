
// ---------------- WISHLIST FUNCTIONALITY ----------------
const hearts = document.querySelectorAll('.whishlist-icon i');
const wishlistIcon = document.getElementById('whishlist-icon');

let wishlistCount = document.createElement('span');
wishlistCount.id = "wishlist-count";
wishlistCount.style.backgroundColor = "red";
wishlistCount.style.color = "white";
wishlistCount.style.borderRadius = "50%";
wishlistCount.style.padding = "2px 6px";
wishlistCount.style.fontSize = "12px";
wishlistCount.style.position = "absolute";
wishlistCount.style.top = "0";
wishlistCount.style.right = "-10px";
wishlistCount.innerText = "0";
wishlistIcon.parentElement.style.position = "relative";
wishlistIcon.parentElement.appendChild(wishlistCount);

let count = 0;

hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    if (heart.classList.contains('active')) {
      heart.classList.remove('active');
      heart.style.color = 'gray';
      count--;
    } else {
      heart.classList.add('active');
      heart.style.color = 'red';
      count++;
    }
    wishlistCount.innerText = count;
  });
});


// ------------------ CART FUNCTIONALITY ------------------
const cartButtons = document.querySelectorAll('.add-cart');
const cartIcon = document.querySelector('.fa-shopping-cart');

let cartCount = document.createElement('span');
cartCount.id = "cart-count";
cartCount.style.backgroundColor = "red";
cartCount.style.color = "white";
cartCount.style.borderRadius = "50%";
cartCount.style.padding = "2px 6px";
cartCount.style.fontSize = "12px";
cartCount.style.position = "absolute";
cartCount.style.top = "0";
cartCount.style.right = "-10px";
cartCount.innerText = "0";
cartIcon.parentElement.style.position = "relative";
cartIcon.parentElement.appendChild(cartCount);

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
cartCount.innerText = cartItems.length;

cartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const book = e.target.closest('.book');
    const title = book.querySelector('h3').innerText;
    const price = book.querySelector('.price').innerText.replace('₹', '').trim();
    const image = book.querySelector('img').src;

    const existing = cartItems.find(item => item.title === title);
    if (!existing) {
      cartItems.push({ title, price, image });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      cartCount.innerText = cartItems.length;
      alert(`${title} added to cart 🛒`);
    } else {
      alert(`${title} is already in cart.`);
    }
  });
});


// ------------------ CART VALIDATION ------------------
const proceedBtn = document.getElementById("proceedToPay");
if (proceedBtn) {
  proceedBtn.addEventListener("click", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before proceeding to payment.");
    } else {
      window.location.href = "payment.html"; // redirect to payment page
    }
  });
}


// ------------------ PAYMENT VALIDATION ------------------
const paymentForm = document.getElementById("paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value.trim();

    if (name === "") {
      alert("Please enter your name");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits");
      return;
    }

    if (!expiry) {
      alert("Please select expiry date");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV must be 3 digits");
      return;
    }

    alert("Payment Successful ✅");
    localStorage.removeItem("cartItems");
    window.location.href = "success.html";
  });
}
