const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');

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
  //check whether user with this email exists already
  try {
  let user = await User.findOne({ email: req.body.email });
  if(user){
    return res.status(400).json({error: 'Sorry, User with this email already exits'})
  }
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })

  res.json(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
}
})

module.exports = router