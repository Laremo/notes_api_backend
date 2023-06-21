const express = require('express');
const notesController = require('../controllers/notesController');
const router = express();

//temporal testing data

//get All notes
router.get('/', notesController.GetAllNotes);

//get one note
router.get('/:id', notesController.getOneNote);

//update note
router.put('/:id', notesController.UpdateNote);

//add new note
router.post('/', notesController.SaveNote);

//delete a note
router.delete('/:id', (req, res) => {
  notes = notes.filter((note) => note.id !== +req.params.id);
  console.log(notes);
  res.status(204).end();
});

module.exports = router;
