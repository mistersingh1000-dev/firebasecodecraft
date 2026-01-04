
class AdminPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.activeView = 'products'; // Default to products view
  }

  connectedCallback() {
    this.render();
    this.initRouting();
    this.updateView(this.activeView); // Load default view
  }

  initRouting() {
    const navLinks = this.shadowRoot.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = e.target.getAttribute('href').substring(1);
        if (view === 'signout') {
          this.signOut();
        } else {
          this.updateView(view);
        }
      });
    });
  }

  updateView(view) {
    this.activeView = view;
    this.renderContent();

    const navLinks = this.shadowRoot.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.parentElement.classList.remove('active');
        if (link.getAttribute('href').substring(1) === view) {
            link.parentElement.classList.add('active');
        }
    });
  }

  signOut() {
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  }

  renderContent() {
    const contentEl = this.shadowRoot.querySelector('#admin-content');
    if (!contentEl) return;

    let content = '<h2>Coming Soon</h2><p>This feature is under construction.</p>';

    switch (this.activeView) {
      case 'dashboard':
        content = '<h2>Dashboard</h2><p>Welcome to your control center.</p>';
        break;
      case 'products':
        content = '<product-manager></product-manager>';
        break;
      case 'categories':
        content = '<h2>Categories</h2><p>Manage your product categories here.</p>';
        break;
      case 'promocodes':
          content = '<h2>Promo Codes</h2><p>Manage discount and promo codes.</p>';
          break;
      case 'medialibrary':
          content = '<h2>Media Library</h2><p>Manage your uploaded images and media.</p>';
          break;
      case 'imagemigration':
          content = '<h2>Image Migration</h2><p>Tools for migrating images.</p>';
          break;
      case 'menus':
          content = '<h2>Menus</h2><p>Manage your site\'s navigation menus.</p>';
          break;
      case 'settings':
          content = '<h2>Settings</h2><p>Configure your site settings.</p>';
          break;
    }

    contentEl.innerHTML = content;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Inter', sans-serif;
        }
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f7f9fc;
        }
        .sidebar {
          width: 250px;
          background-color: #2c3e50;
          color: white;
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
            padding: 0 1.5rem 1.5rem;
            border-bottom: 1px solid #3e516c;
        }
        .sidebar-header h2 {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        }
        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          flex-grow: 1;
        }
        .sidebar-nav li {
          transition: background-color 0.2s ease;
        }
        .sidebar-nav li.active {
          background-color: #3498db;
        }
        .sidebar-nav li:hover {
            background-color: #34495e;
        }
        .sidebar-nav a {
          display: block;
          color: white;
          text-decoration: none;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .main-content {
          flex: 1;
          padding: 2.5rem;
        }
        #admin-content {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        h2 {
            font-size: 2rem;
            color: #2c3e50;
            margin-top: 0;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 0.5rem;
        }
      </style>
      <div class="admin-layout">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2>Admin</h2>
            </div>
            <ul class="sidebar-nav">
                <li><a href="#dashboard">Dashboard</a></li>
                <li class="active"><a href="#products">Products</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#promocodes">Promo Codes</a></li>
                <li><a href="#medialibrary">Media Library</a></li>
                <li><a href="#imagemigration">Image Migration</a></li>
                <li><a href="#menus">Menus</a></li>
                <li><a href="#settings">Settings</a></li>
            </ul>
             <ul class="sidebar-nav">
                <li><a href="#signout">Sign Out</a></li>
             </ul>
        </aside>
        <main class="main-content">
          <div id="admin-content">
            <!-- Content will be injected here -->
          </div>
        </main>
      </div>
    `;
  }
}

customElements.define('admin-panel', AdminPanel);
