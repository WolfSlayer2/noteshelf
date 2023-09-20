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
router.post('/addnote', fetchuser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Description should be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

  try {
    const { title, description, tag } = req.body;
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

//Route 3: Update an existing note using: PUT "/api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //Create a new note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note and update it with new note
  let note = await Notes.findById(req.params.id);
  //if note not exists
  if(!note){
    return res.status(404).send("Not Found")
  }

  //user check
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Access Denied")
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  res.json(note);
})
module.exports = router