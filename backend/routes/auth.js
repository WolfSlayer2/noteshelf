const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//Create a User using: POST "/api/auth/createuser" No Login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Pass. length should be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  //return Bad request & errors if found
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    //check whether user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'Sorry, User with this email already exits' })
    }
    //using bcrypt
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePass,
    })

    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
})

module.exports = router