const express = require('express')
const Notes = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');

//Route 1: Fetch all notes of a User using: GET "/api/notes/fetchnotes" Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 2: Add a new note using: POST "/api/notes/addnote" Login required
router.get('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description should be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  
  try {
    const {title, description, tag} = req.body;
    //return Bad request & errors if found in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router