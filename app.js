// app.js or server.js
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');

const app = express();

<<<<<<< HEAD
app.use(session({
  secret: 'teraSecretKey', // kuch bhi daal de
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Agar local pe hai to secure: false
}));

// app.js

// Middleware to pass user session to the views
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.username ? true : false;
  res.locals.username = req.session.username || null;
  next();
});


=======
// Session middleware
app.use(session({
  secret: 'your-secret-key',  // A secret key for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },  // Set to true if using HTTPS
}));

>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data
app.use(express.json()); // Middleware for parsing JSON data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

<<<<<<< HEAD

=======
>>>>>>> 049d9f73f9937862aa42e7c2b97688b288a4cf92
app.use('/', userRoutes); // Routes for user login, signup, etc.
app.use('/admin', adminRoutes); // Routes for admin functionality

mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
