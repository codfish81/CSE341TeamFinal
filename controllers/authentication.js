const passport = require('passport');

// Check authentication
const ensureAuth = (req, res, next) => {
        // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Ensure authentication'
        // #swagger.description = 'This route ensures that the user is authenticated'
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};

const ensureGuest = (req, res, next) => {
          // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Ensure guest'
        // #swagger.description = 'This route ensures that the user is not authenticated'
  if (req.isAuthenticated()) {
    res.redirect('/auth/dashboard');
  } else {
    return next();
  }
};

// Authenticate with Google
const authenticateWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' });

// Google authentication callback
const googleCallback = (req, res, next) => {
          // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Google OAuth callback'
        // #swagger.description = 'This is a callback route for logging in with Google OAuth'
  passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }

    else { req.session.userId = user._id.toHexString(); }

    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/auth/dashboard');
    });
  })(req, res, next);
  
};

// Logout
const logout = (req, res, next) => {
          // #swagger.tags = ['Authentication']
        // #swagger.summary = 'Logout'
        // #swagger.description = 'This route will log the user out'
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  ensureAuth,
  ensureGuest,
  authenticateWithGoogle,
  googleCallback,
  logout,
};
