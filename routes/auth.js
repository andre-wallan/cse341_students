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
    res.send(`Welcome, ${req.user.displayName}! Login successful.`);
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('You have been logged out.');
  });
});

module.exports = router;