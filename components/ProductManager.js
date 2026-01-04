
import { products } from '../products.js';

class ProductManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        h3 { color: var(--primary-color); margin-bottom: 1rem; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid #ddd; }
        th { background-color: var(--surface-color); }
        .actions button { margin-right: 0.5rem; }
      </style>
      <div>
        <h3>Products</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>${p.title}</td>
                <td>${p.tags.join(', ')}</td>
                <td>${p.price.toFixed(2)}</td>
                <td class="actions">
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('product-manager', ProductManager);
