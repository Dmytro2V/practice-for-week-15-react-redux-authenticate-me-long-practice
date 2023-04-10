// backend/routes/api/session.js
const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Log in
router.post(
  '/',
  asyncHandler(async (req,res, next) => {
    const {credential, password} = req.body;
    console.log("🚀 ~ file: session.js:15 ~ asyncHandler ~ credential, password:", credential, password)
    
    const user = await User.login({credential, password});
    console.log("🚀 ~ file: session.js:18 ~ asyncHandler ~ user:", user)
    
    if (user) {
      await setTokenCookie(res, user);
      return res.json({user})
    } else {
      const err = new Error('Login Failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.']
      return next(err);
    }
  })
)

// Log out
router.delete (
  '/',
  (_req, res) => {res.clearCookie('token');
    return res.json({message: 'success'})
  }
);

module.exports = router;