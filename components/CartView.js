
class CartView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // In a real app, cart data would come from localStorage or a server.
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    this.shadowRoot.innerHTML = `
      <style>
        .cart-view { max-width: 800px; margin: 2rem auto; padding: 2rem; background: var(--surface-color); border-radius: 12px; box-shadow: 0 8px 24px var(--shadow-color); }
        h2 { color: var(--primary-color); margin-bottom: 1.5rem; text-align: center; }
        .cart-items { list-style: none; padding: 0; }
        .cart-item { display: flex; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 1.5rem; }
        .cart-item:last-child { border-bottom: none; }
        .cart-item img { width: 100px; height: 100px; object-fit: cover; border-radius: 8px; margin-right: 1.5rem; }
        .item-info h3 { margin: 0; font-size: 1.1rem; color: var(--text-color); }
        .item-info p { margin: 0.5rem 0; font-size: 1rem; color: var(--primary-color); font-weight: 600; }
        .remove-btn { margin-left: auto; background: #ff4d4d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; }
        .cart-summary { margin-top: 2rem; text-align: right; }
        .total { font-size: 1.5rem; font-weight: bold; color: var(--primary-color); margin-bottom: 1rem; }
        .checkout-btn { background-color: var(--primary-color); color: white; padding: 0.85rem 2rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; text-decoration: none; }
        .empty-cart { text-align: center; padding: 2rem; }
        .empty-cart p { font-size: 1.2rem; color: #666; }
        .empty-cart a { color: var(--primary-color); }
      </style>
      <div class="cart-view">
        <h2>Your Shopping Cart</h2>
        ${cartItems.length > 0 ? `
          <ul class="cart-items">
            ${cartItems.map(item => `
              <li class="cart-item" data-id="${item.id}">
                <img src="${item.imageUrl}" alt="${item.title}">
                <div class="item-info">
                  <h3>${item.title}</h3>
                  <p>₹${item.price}</p>
                </div>
                <button class="remove-btn">Remove</button>
              </li>
            `).join('')}
          </ul>
          <div class="cart-summary">
            <div class="total">Total: ₹${total.toFixed(2)}</div>
            <a href="#" class="checkout-btn">Proceed to Checkout</a>
          </div>
        ` : `
          <div class="empty-cart">
            <p>Your cart is empty.</p>
            <a href="/">Continue Shopping</a>
          </div>
        `}
      </div>
    `;

    this.shadowRoot.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => this.removeFromCart(e));
    });
    
    const checkoutBtn = this.shadowRoot.querySelector('.checkout-btn');
    if(checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => this.checkout(e));
    }
  }

  removeFromCart(event) {
    const cartItem = event.target.closest('.cart-item');
    const itemId = cartItem.dataset.id;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.render();
  }

  checkout(event) {
    event.preventDefault();
    // In a real app, this would redirect to a proper checkout page
    // that handles shipping, payment, etc.
    alert("Redirecting to a simulated payment page.");
    // For now, we'll just show the payment modal
    const paymentModal = document.createElement('payment-modal');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    paymentModal.product = { title: 'Your Order', price: total };
    document.body.appendChild(paymentModal);
  }
}

customElements.define('cart-view', CartView);
