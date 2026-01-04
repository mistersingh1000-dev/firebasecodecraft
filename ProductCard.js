
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set product(product) {
    this._product = product;
    this.render();
  }

  get product() {
    return this._product;
  }

  render() {
    if (!this.product) {
      return;
    }

    const { title, description, imageUrl, price } = this.product;
    const priceInUSDT = (price / 80).toFixed(2);

    this.shadowRoot.innerHTML = `
      <style>
        /* ... existing styles ... */
        .product-card {
          background-color: var(--surface-color);
          border-radius: 12px;
          box-shadow: 0 4px 16px var(--shadow-color);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px var(--shadow-color);
        }

        .product-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-info h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-color);
          line-height: 1.4;
        }

        .product-info p {
          margin: 0.75rem 0 1.5rem;
          color: #666;
          flex-grow: 1;
          font-size: 0.9rem;
        }

        .product-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .usdt-price {
          font-size: 1rem;
          color: #666;
        }

        .add-to-cart-button {
            display: inline-block;
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            text-align: center;
            font-weight: 600;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 15px var(--glow-color);
            cursor: pointer;
        }

        .add-to-cart-button:hover {
            background-color: var(--secondary-color);
            box-shadow: 0 8px 25px var(--glow-color);
        }

      </style>
      <div class="product-card">
        <div class="product-image">
          <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="product-info">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="product-footer">
             <div class="price">₹${price} <span class="usdt-price">(${priceInUSDT} USDT)</span></div>
             <a class="add-to-cart-button">Add to Cart</a>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.add-to-cart-button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('add-to-cart', {
            bubbles: true,
            composed: true,
            detail: { product: this.product }
        }));
    });
  }
}

customElements.define('product-card', ProductCard);
