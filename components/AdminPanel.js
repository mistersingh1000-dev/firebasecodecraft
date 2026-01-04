
class AdminPanel extends HTMLElement {
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
        .admin-panel { max-width: 1200px; margin: 2rem auto; padding: 2rem; background: var(--surface-color); border-radius: 12px; box-shadow: 0 8px 24px var(--shadow-color); }
        h2 { color: var(--primary-color); text-align: center; margin-bottom: 1.5rem; }
        .admin-nav { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid #ccc; padding-bottom: 1rem;}
      </style>
      <div class="admin-panel">
        <h2>Admin Panel</h2>
        <div class="admin-nav">
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
        </div>
        <div id="admin-content">
            <product-manager></product-manager>
        </div>
      </div>
    `;
  }
}

customElements.define('admin-panel', AdminPanel);
