const passport = require('passport');

// Check authentication
const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated())
    return next();
  } else {
    res.redirect('/');
  }
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/auth/dashboard');
  } else {
    return next();
  }
};

// Authenticate with Google
const authenticateWithGoogle = passport.authenticate('google', { scope: ['profile'], prompt: 'select_account'  });

// Google authentication callback
const googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/auth/dashboard');
    });
  })(req, res, next);
};

// Logout
const logout = (req, res, next) => {
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
