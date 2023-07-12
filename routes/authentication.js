const router = require('express').Router();
const path = require('path');
const {
  ensureGuest,
  ensureAuth,
  authenticateWithGoogle,
  googleCallback,
  logout,
} = require('../controllers/authentication');

// Ensure user is authenticated
router.get('/', ensureGuest, (req, res) => {
  res.redirect('/auth/google');
});

// Authenticate with Google
router.get('/google', authenticateWithGoogle);

// Google authentication callback
router.get('/google/callback', googleCallback);

// Logout
router.get('/logout', logout);

// Redirect to user dashboard after logging in
router.get('/dashboard', ensureAuth, (req, res) => {
  res.sendFile('/frontEnd/dashboard.html', { root: './' });
});

module.exports = router;