/* Utility Functions */

// Retrieve the cart from localStorage (or return an empty array if none exists)
function getCart() {
  let cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Save the updated cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* Cart Functions */

// Add a product to the cart
function addToCart(productName, productPrice) {
  let cart = getCart();
  // Check if the product is already in the cart
  let existingProduct = cart.find(item => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
  saveCart(cart);
  alert(`${productName} has been added to your cart!`);
}

// Display cart items on the cart page
function displayCart() {
  let cart = getCart();
  let cartItemsDiv = document.getElementById('cartItems');
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartItemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      let itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
        <hr>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });
  }
  document.getElementById('totalPrice').textContent = totalPrice;
}

// Remove an item from the cart
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  displayCart();
}

/* Checkout Functions */

// Show the fake checkout form when the checkout button is clicked
function handleCheckout() {
  let checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      document.getElementById('checkoutForm').style.display = 'block';
    });
  }
}

// Handle the fake checkout form submission
function handleCheckoutForm() {
  let checkoutForm = document.getElementById('fakeCheckout');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Simulate order processing
      alert("Thank you for your order!");
      // Clear the cart after "checkout"
      localStorage.removeItem('cart');
      window.location.reload();
    });
  }
}

/* Initialize Scripts on Page Load */
document.addEventListener('DOMContentLoaded', function () {
  // If on the cart page, display the cart and attach checkout handlers
  if (document.getElementById('cartItems')) {
    displayCart();
    handleCheckout();
    handleCheckoutForm();
  }
});
