const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Passport config
require('./passport');
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/confessions', require('./routes/confessions'));

// auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // redirect to frontend after successful login
    res.redirect('http://localhost:3000');
  }
);

// endpoint to get current logged-in user
app.get('/auth/user', (req, res) => {
  if(req.isAuthenticated()) {
    res.json({ id: req.user.id, displayName: req.user.displayName });
  } else {
    res.status(401).json({});
  }
});

// connect DB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(console.error);
