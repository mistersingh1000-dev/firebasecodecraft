
class SiteFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        footer {
          padding: 4rem 2rem;
          background-color: var(--surface-color);
          text-align: center;
          margin-top: 2rem;
          box-shadow: 0 -2px 8px var(--shadow-color);
        }

        .footer-links {
            margin-bottom: 1rem;
        }

        .footer-links a {
            margin: 0 1rem;
            text-decoration: none;
            color: var(--text-color);
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary-color);
        }

        .footer-contact p {
            margin: 0.5rem 0;
            color: var(--text-color);
        }
        
        .footer-copyright {
            margin-top: 2rem;
        }

      </style>
      <footer>
        <div class="footer-links">
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="return-policy.html">Return Policy</a>
          <a href="terms-and-conditions.html">Terms and Conditions</a>
          <a href="contact.html">Contact Us</a>
        </div>
        <div class="footer-contact">
          <p>Contact us: +917009732517 | mistersingh1000@gmail.com</p>
        </div>
        <div class="footer-copyright">
            <p>&copy; 2024 CodeCraftMarketing.in. All rights reserved.</p>
            <p>All products are sold exclusively on codecraftmarketing.in. We do not have any other website.</p>
        </div>
      </footer>
    `;
    shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('site-footer', SiteFooter);
