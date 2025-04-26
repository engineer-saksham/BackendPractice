const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Admin middleware (to check if user is an admin)
const isAdmin = (req, res, next) => {
  // Check if the session contains the admin role (assuming you stored it as 'role' during login)
  if (req.session.role === 'admin') {
    return next();
  }
  // Redirect to login if user is not an admin
  return res.redirect('/login');
};

// Admin product add route (GET)
router.get('/add-product', isAdmin, (req, res) => {
  res.render('admin/add-product');  // Render the product addition form
});

// Admin product add route (POST)
// routes/adminRoutes.js

// Admin product add route
router.post('/add-product', isAdmin, async (req, res) => {
  const { name, imageUrl, price, description, category } = req.body;

  // Validate input
  if (!name || !imageUrl || !price || !description || !category) {
    return res.render('admin/add-product', { error: 'All fields are required!' });
  }

  // Create a new product
  const newProduct = new Product({
    name,
    imageUrl,
    price,
    description,
    category,
  });

  try {
    await newProduct.save();
    res.redirect('/admin/dashboard'); // Redirect to admin dashboard after saving
  } catch (error) {
    return res.render('admin/add-product', { error: 'Something went wrong. Please try again.' });
  }
});


// Admin dashboard route to view all products
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const products = await Product.find();  // Get all products
    res.render('admin/dashboard', { products });  // Render the admin dashboard with products
  } catch (error) {
    console.error(error);  // Log the error to the console
    res.render('admin/dashboard', { error: 'Unable to fetch products.' });
  }
});

module.exports = router;
