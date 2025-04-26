const express = require('express');
const Product = require('../models/Product');
<<<<<<< HEAD
const User = require('../models/User'); // Dhyan se - U capital hona chahiye import me
=======
>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
const router = express.Router();

// Admin middleware (to check if user is an admin)
const isAdmin = (req, res, next) => {
<<<<<<< HEAD
  if (req.session.role === 'admin') {
    return next();
  }
=======
  // Check if the session contains the admin role (assuming you stored it as 'role' during login)
  if (req.session.role === 'admin') {
    return next();
  }
  // Redirect to login if user is not an admin
>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
  return res.redirect('/login');
};

// Admin product add route (GET)
<<<<<<< HEAD
router.get('/add-product', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.render('admin/add-product', { user: user, error: null });
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

// Admin product add route (POST)
router.post('/add-product', isAdmin, async (req, res) => {
  const { name, imageUrl, price, description, category } = req.body;

  if (!name || !imageUrl || !price || !description || !category) {
    const user = await User.findById(req.session.userId);
    return res.render('admin/add-product', { user: user, error: 'All fields are required!' });
  }

=======
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
>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
  const newProduct = new Product({
    name,
    imageUrl,
    price,
    description,
    category,
  });

  try {
    await newProduct.save();
<<<<<<< HEAD
    res.redirect('/admin/dashboard');
  } catch (error) {
    const user = await User.findById(req.session.userId);
    console.error(error);
    return res.render('admin/add-product', { user: user, error: 'Something went wrong. Please try again.' });
  }
});

// Admin dashboard route to view all products
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const products = await Product.find();
    res.render('admin/dashboard', { user: user, products: products });
  } catch (error) {
    console.error(error);
    res.redirect('/login');
  }
});

// Admin logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.send('Error logging out.');
    }
    res.redirect('/'); // Redirect to homepage after logout
  });
});

=======
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

>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
module.exports = router;
