const router = require('express').Router();
const passport = require('passport');

// Google OAuth login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful login
    res.redirect('/api-docs');
  }
);

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }

    req.session.destroy(() => {
      res.send('Logged out');
    });
  });
});
module.exports = router;