const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
console.log(profile);
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)
// @desc    Auth with facebook
// @route   GET /auth/facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile'] }))
console.log(profile);
// @desc    facebook auth callback
// @route   GET /auth/facebook/callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)
// @desc    Auth with facebook
// @route   GET /auth/facebook
router.get('/twitter', passport.authenticate('twitter', { scope: ['profile'] }))
console.log(profile);
// @desc    twitter auth callback
// @route   GET /auth/twitter/callback
router.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard')
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
