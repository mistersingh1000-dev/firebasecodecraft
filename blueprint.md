# CodeCraftMarketing.in Blueprint

## Overview

CodeCraftMarketing.in is an e-commerce website for selling digital products. It is a single-page application built with HTML, CSS, and JavaScript. The site uses web components for a modular UI and **Cloud Firestore for persistent data storage.**

## Project Structure

*   `index.html`: The main entry point for the application.
*   `style.css`: The main stylesheet for the application.
*   `main.js`: The main JavaScript file for the application. It imports all necessary modules and components.
*   `firebase-config.js`: Contains the configuration to connect to the Firebase project.
*   `components/`: A directory that contains all of the web components for the site.
    *   `SiteHeader.js`: The header for the site. It includes the site title and navigation.
    *   `SiteFooter.js`: The footer for the site. It includes links to the privacy policy, terms of service, and contact page.
    *   `ProductCard.js`: A card that displays a single product.
    *   `CategoryCard.js`: A card that displays a single product category.
    *   `AuthForm.js`: A form for logging in to the admin panel.
    *   `AdminPanel.js`: The main component for the admin section, providing navigation.
    *   `ProductManager.js`: The component for managing products, now integrated with Cloud Firestore.
*   `admin.html`: The admin panel for the site. It allows the user to manage the products on the site.
*   `auth.html`: The login page for the admin panel.
*   `cart.html`: The shopping cart page for the site.
*   `contact.html`: The contact page for the site.
*   `privacy-policy.html`: The privacy policy page for the site.
*   `return-policy.html`: The return policy page for the site.
*   `terms-and-conditions.html`: The terms and conditions page for the site.

## Features

*   The site is a single-page application.
*   The site uses web components to create a modular and reusable UI.
*   The site has a product catalog that can be browsed by category.
*   The site has a shopping cart that allows users to purchase products.
*   The site has an admin panel that allows the user to manage the products on the site.
*   **Product data is now stored and managed in Cloud Firestore, providing persistent storage.**
*   User authentication for the admin panel is handled via local storage.

## Current Plan

**I have successfully integrated Firebase and Cloud Firestore into the application.** The admin panel now uses Firestore to provide permanent storage for the site's products. All product management operations (add, edit, delete) are now persistent. The application is fully functional. I am ready for your next instruction.
