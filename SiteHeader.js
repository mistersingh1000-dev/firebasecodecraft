
class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    this.shadowRoot.innerHTML = `
      <style>
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: var(--surface-color);
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        .logo-link { text-decoration: none; }
        .logo { font-weight: 700; font-size: 1.5rem; color: var(--primary-color); }
        nav a { margin: 0 1rem; text-decoration: none; color: var(--text-color); font-weight: 500; transition: color 0.3s ease; }
        nav a:hover { color: var(--primary-color); }
        .nav-buttons a, .nav-buttons button { margin-left: 1rem; }
        .logout-btn { background: transparent; border: none; font-size: 1rem; color: var(--text-color); cursor: pointer; font-weight: 500; }
        .logout-btn:hover { color: var(--primary-color); }
      </style>
      <header>
        <a href="/" class="logo-link"><div class="logo">CodeCraftMarketing.in</div></a>
        <nav>
          <a href="/">Home</a>
          <a href="/index.html#products">Products</a>
          <a href="/index.html#categories">Categories</a>
          <a href="/contact.html">Contact Us</a>
        </nav>
        <div class="nav-buttons">
          <a href="/cart.html">Cart</a>
          ${user ? `
            <a href="/admin.html">Admin</a>
            <button class="logout-btn">Logout</button>
          ` : `
            <a href="/auth.html">Sign In</a>
          `}
        </div>
      </header>
    `;

    const logoutBtn = this.shadowRoot.querySelector('.logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.render();
    window.location.href = '/';
  }
}

customElements.define('site-header', SiteHeader);
