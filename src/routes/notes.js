const express = require('express');
const notesController = require('../controllers/notesController');
const router = express();

//get All notes
router.get('/', notesController.GetAllNotes);

//get one note
router.get('/:id', notesController.getOneNote);

//update note
router.put('/:id', notesController.UpdateNote);

//add new note
router.post('/', notesController.SaveNote);

//delete a note
router.delete('/:id', notesController.DeleteNote);

module.exports = router;
