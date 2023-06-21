const express = require('express');
const notesController = require('../controllers/notesController');
const router = express();

//temporal testing data

//get All notes
router.get('/', notesController.GetAllNotes);

//get one note
router.get('/:id', notesController.getOneNote);

//update note
router.put('/:id', (req, res) => {
  const { note } = req.body;
  if (!note) res.status(400).json({ error: 'missing note' });
  notes = notes.map((nt) => {
    if (nt.id === note.id) {
      return note;
    }
    return nt;
  });
  res.status(200).json(note);
});

//add new note
router.post('/', notesController.SaveNote);

//delete a note
router.delete('/:id', (req, res) => {
  notes = notes.filter((note) => note.id !== +req.params.id);
  console.log(notes);
  res.status(204).end();
});

module.exports = router;
