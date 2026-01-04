
import './components/SiteHeader.js';
import './components/SiteFooter.js';
import './components/ProductCard.js';
import './components/CategoryCard.js';
import './components/CartView.js';
import './components/ContactForm.js';
import './components/PaymentModal.js';
import firebaseConfig from './firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCollection = collection(db, 'products');

let products = [];

async function fetchProducts() {
    const querySnapshot = await getDocs(productsCollection);
    products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProducts();
    renderCategories();
}

function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = '';
        products.slice(0, 10).forEach(product => {
            const productCard = document.createElement('product-card');
            productCard.product = product;
            productGrid.appendChild(productCard);
        });
    }
}

function renderCategories() {
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
        categoryGrid.innerHTML = '';
        categories.forEach(category => {
            const categoryCard = document.createElement('category-card');
            categoryCard.category = category;
            categoryGrid.appendChild(categoryCard);
        });
    }
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

fetchProducts();
