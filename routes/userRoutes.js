// routes/userRoutes.js
<<<<<<< HEAD

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Capital 'U' for model
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
  const loggedIn = !!req.session.username;
  const user = { username: req.session.username || '' };
  res.render('home', { loggedIn, user });
});

// Signup Page (GET)
router.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

// Signup Form (POST)
router.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.render('signup', { error: 'All fields are required!' });
  }

  if (password !== confirmPassword) {
    return res.render('signup', { error: 'Passwords do not match.' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render('signup', { error: 'Email already registered.' });
    }

    // **Direct save karo bina manually hash kiye**
    const newUser = new User({
      username,
      email,
      password,  // plain password -- model me pre-save hook hash karega
      role: role || 'user',
    });

    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.render('signup', { error: 'Error during signup. Try again.' });
  }
});

// Login Page (GET)
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Login Form (POST)
// Login form submit route (POST)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('login', { error: 'Please provide both username and password.' });
  }

  try {
    const user = await User.findOne({ username: username }); // find user by username

    if (!user) {
      return res.render('login', { error: 'Invalid credentials (User not found)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', { error: 'Invalid credentials (Password mismatch)' });
    }

    // Login successful
    req.session.userId = user._id;
    req.session.username = user.username;
    req.session.role = user.role;

    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.render('login', { error: 'Something went wrong. Please try again.' });
  }
});


// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.send('Error during logout.');
    }
    res.redirect('/');
  });
});

module.exports = router;
=======
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

// User registration route



// Home route
router.get('/', (req, res) => {
    // Check if the user is logged in by checking session
    const loggedIn = req.session.username ? true : false;
    const username = req.session.username || ''; // Use session's username
  
    res.render('home', { loggedIn, username });
  });

router.get('/signup', (req, res) => {
    res.render('signup', { error: null });    // 'signup.ejs' file ko render karega
  });

router.post('/signup', async (req, res) => {
    const { username, email, password, confirmPassword, role } = req.body;
  
    if (password !== confirmPassword) {
      return res.send('Passwords do not match');
    }
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.send('User already exists');
      }
  
      // Create new user, you can assign 'admin' role here
      const user = new User({
        username,
        email,
        password,
        role: role || 'user',  // Default to 'user' if not provided
      });
  
      await user.save();
      res.send('User created successfully');
    } catch (error) {
      res.send('Something went wrong');
    }
  });

router.get('/login', (req, res) => {
    res.render('login', { error: null });    // 'signup.ejs' file ko render karega
  });

/// Login route to authenticate user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.render('login', { error: 'Please provide both username and password.' });
    }
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.render('login', { error: 'Invalid credentials' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.render('login', { error: 'Invalid credentials' });
      }
  
      // Set session after successful login
      req.session.userId = user._id; // Store user ID in session
      req.session.role = user.role;  // Store user role
  
      if (user.role === 'admin') {
        return res.redirect('/admin/dashboard'); // Redirect to admin dashboard if the user is an admin
      }
  
      return res.redirect('/'); // Redirect to homepage if not admin
  
    } catch (error) {
      console.error(error);
      res.render('login', { error: 'Invalid username or password' });
    }
  });

// User logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send('Error logging out');
      }
      res.redirect('/');  // Redirect to homepage after logout
    });
  });
  
module.exports = router;

>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
