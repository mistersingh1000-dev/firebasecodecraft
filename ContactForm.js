
class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .contact-form { max-width: 600px; margin: 2rem auto; padding: 2rem; background: var(--surface-color); border-radius: 12px; box-shadow: 0 8px 24px var(--shadow-color); }
        h2 { color: var(--primary-color); text-align: center; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        input, textarea { width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; box-sizing: border-box; }
        textarea { resize: vertical; min-height: 120px; }
        button { width: 100%; background-color: var(--primary-color); color: white; padding: 0.85rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 1rem; }
        button:hover { background-color: var(--secondary-color); }
      </style>
      <div class="contact-form">
        <h2>Contact Us</h2>
        <form>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    `;
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // In a real app, you would send this to a server (e.g., via email or to a database).
    console.log('Contact form submitted:', data);
    alert('Thank you for your message! We will get back to you shortly. (Simulated)');
    e.target.reset();
  }
}

customElements.define('contact-form', ContactForm);
