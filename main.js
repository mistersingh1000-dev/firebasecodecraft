
import { products } from './products.js';
import './components/SiteHeader.js';
import './components/SiteFooter.js';
import './components/ProductCard.js';
import './components/CategoryCard.js';

const allTags = products.flatMap(p => p.tags);
const uniqueTags = [...new Set(allTags)];

const categoryImages = [
  'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const categories = uniqueTags.map(tag => ({
    name: tag,
    image: categoryImages[Math.floor(Math.random() * categoryImages.length)]
}));

const categoryGrid = document.querySelector('.category-grid');
if (categoryGrid) {
    categories.forEach(category => {
        const categoryCard = document.createElement('category-card');
        categoryCard.setAttribute('name', category.name);
        categoryCard.setAttribute('image', category.image);
        categoryGrid.appendChild(categoryCard);
    });
}

const productGrid = document.querySelector('.product-grid');
if (productGrid) {
    products.slice(0, 10).forEach(product => {
        const productCard = document.createElement('product-card');
        productCard.product = product;
        productGrid.appendChild(productCard);
    });
}

document.addEventListener('add-to-cart', (event) => {
    const product = event.detail.product;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} has been added to your cart!`);
    // Force header to re-render to update cart count
    const header = document.querySelector('site-header');
    if (header) {
        header.render();
    }
});
