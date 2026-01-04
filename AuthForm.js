
class AuthForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isLogin = this.getAttribute('type') === 'login';
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
    this.shadowRoot.getElementById('switch-to-signup').addEventListener('click', (e) => {
        e.preventDefault();
        this.isLogin = false;
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
        this.shadowRoot.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.isLogin = true;
            this.render();
            this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
            this.shadowRoot.getElementById('switch-to-signup').addEventListener('click', (e) => {
                e.preventDefault();
                this.isLogin = false;
                this.render();
            });
        });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .auth-form { max-width: 400px; margin: 2rem auto; padding: 2rem; background: var(--surface-color); border-radius: 12px; box-shadow: 0 8px 24px var(--shadow-color); }
        h2 { color: var(--primary-color); text-align: center; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input { width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; box-sizing: border-box; }
        button { width: 100%; background-color: var(--primary-color); color: white; padding: 0.85rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; transition: background-color 0.3s; }
        button:hover { background-color: var(--secondary-color); }
        .switch-form { text-align: center; margin-top: 1rem; font-size: 0.9rem; }
        .switch-form a { color: var(--primary-color); text-decoration: none; font-weight: 500; }
        .switch-form a:hover { text-decoration: underline; }
      </style>
      <div class="auth-form">
        <h2>${this.isLogin ? 'Login' : 'Sign Up'}</h2>
        <form>
          ${!this.isLogin ? `
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required>
          </div>` : ''}
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">${this.isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p class="switch-form">
          ${this.isLogin ? `Don\'t have an account? <a href="#" id="switch-to-signup">Sign up</a>` : `Already have an account? <a href="#" id="switch-to-login">Login</a>`}
        </p>
      </div>
    `;

    if (this.isLogin) {
        this.shadowRoot.getElementById('switch-to-signup').addEventListener('click', (e) => {
            e.preventDefault();
            this.isLogin = false;
            this.render();
            this.addEventListeners();
        });
    } else {
        this.shadowRoot.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.isLogin = true;
            this.render();
            this.addEventListeners();
        });
    }
  }

  addEventListeners() {
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));

    if (this.isLogin) {
        this.shadowRoot.getElementById('switch-to-signup').addEventListener('click', (e) => {
            e.preventDefault();
            this.isLogin = false;
            this.render();
            this.addEventListeners();
        });
    } else {
        this.shadowRoot.getElementById('switch-to-login').addEventListener('click', (e) => {
            e.preventDefault();
            this.isLogin = true;
            this.render();
            this.addEventListeners();
        });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // Simulate authentication
    if (this.isLogin) {
        console.log('Login submitted:', data);
        // Simulate successful login
        localStorage.setItem('user', JSON.stringify({ email: data.email }));
        alert('Login successful! (Simulated)');
    } else {
        console.log('Signup submitted:', data);
        // Simulate successful signup
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
        alert('Signup successful! You can now log in. (Simulated)');
        this.isLogin = true;
        this.render();
        this.addEventListeners();
    }
    window.location.href = '/';
  }
}

customElements.define('auth-form', AuthForm);
