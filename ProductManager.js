
import firebaseConfig from '../firebase-config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productsCollection = collection(db, 'products');

class ProductManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [];
    this.editingProduct = null;
  }

  async connectedCallback() {
    this.render();
    this.bindEvents();
    await this.fetchProducts();
    this.renderProductList();
  }

  async fetchProducts() {
    const querySnapshot = await getDocs(productsCollection);
    this.products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  bindEvents() {
    const addProductBtn = this.shadowRoot.querySelector('#add-product-btn');
    addProductBtn.addEventListener('click', () => this.showProductForm());

    const productForm = this.shadowRoot.querySelector('#product-form');
    productForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

    const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
    cancelBtn.addEventListener('click', () => this.hideProductForm());
    
    this.shadowRoot.addEventListener('click', (e) => {
        if(e.target.classList.contains('edit-btn')){
            const productId = e.target.dataset.id;
            this.showProductForm(productId);
        }
        if(e.target.classList.contains('delete-btn')){
            const productId = e.target.dataset.id;
            this.deleteProduct(productId);
        }
    });
  }
  
  showProductForm(productId = null) {
      this.editingProduct = this.products.find(p => p.id === productId) || null;
      const form = this.shadowRoot.querySelector('#product-form');
      const legend = form.querySelector('legend');
      
      if(this.editingProduct){
          legend.textContent = 'Edit Product';
          form.elements['title'].value = this.editingProduct.title;
          form.elements['description'].value = this.editingProduct.description;
          form.elements['price'].value = this.editingProduct.price;
          form.elements['tags'].value = this.editingProduct.tags.join(', ');
          form.elements['imageUrl'].value = this.editingProduct.imageUrl;
      } else {
          legend.textContent = 'Add Product';
          form.reset();
      }
      
      this.shadowRoot.querySelector('#form-container').style.display = 'block';
  }
  
  hideProductForm(){
      this.shadowRoot.querySelector('#form-container').style.display = 'none';
      this.editingProduct = null;
  }
  
  async handleFormSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const newProductData = {
          title: form.elements['title'].value,
          description: form.elements['description'].value,
          price: parseFloat(form.elements['price'].value),
          tags: form.elements['tags'].value.split(',').map(t => t.trim()),
          imageUrl: form.elements['imageUrl'].value
      };

      if(this.editingProduct) {
          const productRef = doc(db, "products", this.editingProduct.id);
          await updateDoc(productRef, newProductData);
      } else {
          await addDoc(productsCollection, newProductData);
      }
      
      await this.fetchProducts();
      this.renderProductList();
      this.hideProductForm();
  }
  
  async deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, "products", productId));
      await this.fetchProducts();
      this.renderProductList();
    }
  }

  renderProductList() {
      const tbody = this.shadowRoot.querySelector('tbody');
      tbody.innerHTML = this.products.map(p => `
        <tr>
          <td>${p.title}</td>
          <td>${p.tags.join(', ')}</td>
          <td>$${p.price.toFixed(2)}</td>
          <td class="actions">
            <button class="edit-btn" data-id="${p.id}">Edit</button>
            <button class="delete-btn" data-id="${p.id}">Delete</button>
          </td>
        </tr>
      `).join('');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        h3 { color: var(--primary-color); margin-bottom: 1rem; font-size: 1.5rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
        th, td { text-align: left; padding: 0.75rem 1rem; border-bottom: 1px solid #e0e0e0; }
        th { background-color: #f7f9fc; font-weight: 600; }
        .actions button { 
            margin-right: 0.5rem; 
            padding: 0.4rem 0.8rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .edit-btn { background-color: #3498db; color: white; }
        .edit-btn:hover { background-color: #2980b9; }
        .delete-btn { background-color: #e74c3c; color: white; }
        .delete-btn:hover { background-color: #c0392b; }
        #add-product-btn { 
            background-color: #2ecc71; 
            color: white; 
            padding: 0.8rem 1.5rem; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer; 
            font-size: 1rem;
            font-weight: 600;
            transition: background-color 0.2s;
        }
        #add-product-btn:hover { background-color: #27ae60; }
        
        #form-container {
            display: none;
            margin-top: 2rem;
            padding: 2rem;
            background-color: #fdfdfd;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        #product-form fieldset { border: none; padding: 0; margin: 0; }
        #product-form legend { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; color: #2c3e50;}
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .form-group input, .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        .form-actions { margin-top: 1.5rem; text-align: right;}
        .form-actions button {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        }
        #save-btn { background-color: #3498db; color: white; }
        #cancel-btn { background-color: #bdc3c7; color: #2c3e50; margin-left: 0.5rem; }
      </style>
      <div>
        <button id="add-product-btn">+ Add New Product</button>
        
        <div id="form-container">
            <form id="product-form">
                <fieldset>
                    <legend>Add Product</legend>
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input type="text" id="title" name="title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" id="price" name="price" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="tags">Tags (comma-separated)</label>
                        <input type="text" id="tags" name="tags" required>
                    </div>
                    <div class="form-group">
                        <label for="imageUrl">Image URL</label>
                        <input type="url" id="imageUrl" name="imageUrl" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" id="save-btn">Save Product</button>
                        <button type="button" id="cancel-btn">Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>

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
            <!-- Product rows will be injected here -->
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('product-manager', ProductManager);
