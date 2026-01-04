
class CategoryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set category(category) {
    this._category = category;
    this.render();
  }

  get category() {
    return this._category;
  }

  render() {
    if (!this.category) {
      return;
    }

    const { name, image } = this.category;

    this.shadowRoot.innerHTML = `
      <style>
        .category-card {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 16px var(--shadow-color);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 200px;
        }

        .category-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px var(--shadow-color);
        }

        .category-card a {
            text-decoration: none;
            color: white;
            display: block;
            height: 100%;
        }

        .category-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            transition: transform 0.3s ease;
        }

        .category-card:hover .category-image {
            transform: scale(1.1);
        }

        .category-name {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
            z-index: 2;
            text-align: center;
        }

        .category-name h3 {
            margin: 0;
            font-size: 1.5rem;
        }
      </style>
      <div class="category-card">
        <a href="#">
            <img src="${image}" alt="${name}" class="category-image">
            <div class="category-name">
                <h3>${name}</h3>
            </div>
        </a>
      </div>
    `;
  }
}

customElements.define('category-card', CategoryCard);
