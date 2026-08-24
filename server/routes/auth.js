const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper function to send token in cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod', {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
};

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    user = await User.create({
      name,
      email,
      password,
      role: role || 'candidate',
      authProvider: 'local'
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(`[LOGIN ATTEMPT] email: '${email}', role: '${role}', password: '${password}'`);

    if (!email || !password) {
      console.log(`[LOGIN FAILED] Missing email or password`);
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log(`[LOGIN FAILED] User not found for email: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Optional: Validate role if provided by client
    if (role && user.role !== role) {
      console.log(`[LOGIN FAILED] Role mismatch. Expected: ${role}, Found: ${user.role}`);
      return res.status(401).json({ success: false, message: `Account exists, but not as a ${role}` });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log(`[LOGIN FAILED] Password mismatch for email: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log(`[LOGIN SUCCESS] User logged in successfully: ${email}`);

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
});

// @route   POST /api/auth/google
// @desc    Login/Register via Google GIS Token
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { email, name, picture } = req.body;
    
    if (!email) {
       return res.status(400).json({ success: false, message: 'Email required for OAuth' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        authProvider: 'google'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'OAuth processing error', error: error.message });
  }
});

// @route   GET /api/auth/logout
// @desc    Log user out / clear cookie
// @access  Private
router.get('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ success: true, data: {} });
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar
    }
  });
});

module.exports = router;
