const express = require('express');
const router = express.Router(); //chamando o express do router
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User model - fazendo a chamada

const User = require('../../models/User');

// @route   POST to api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check for existing user
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: 'User does not exists' });
    }

    // Validate password
    bcrypt.compare(password, user.password) //compara o plain text password com o hash password
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

            jwt.sign(
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token: token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            );
        })
  });
});


// @route   GET to api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')//nao retorna a senha
        .then(user => res.json(user));
});

module.exports = router;