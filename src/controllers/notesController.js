const notesService = require('../services/notesService');
const notesController = {};

notesController.SaveNote = (req, res) => {
  try {
    const { note: noteToAdd } = req.body;
    if (!noteToAdd || !noteToAdd.content) {
      res.status(400).json({ error: 'content is missing' });
    }
    const { status, response, note } = notesService.SaveNote(noteToAdd);
    res.status(status).json({ response, note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

notesController.UpdateNote = (req, res) => {
  try {
    const { note: noteToUpdate } = req.body;
    if (noteToUpdate.id !== +req.params.id)
      res.status(400).json({ error: 'Bad request' });
    if (!noteToUpdate || !noteToUpdate.content) {
      res.status(400).json({ error: 'missing content' });
    }
    const { status, response, note } = notesService.UpdateNote(noteToUpdate);
    res.status(status).json({ response, note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

notesController.GetAllNotes = (_, res) => {
  try {
    const notes = notesService.getAllNotes();
    res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

notesController.getOneNote = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, note } = notesService.getOneNote(id);
    res.status(status).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

notesController.DeleteNote = (req, res) => {
  try {
    const id = +req.params.id;
    const { status, message } = notesService.DeleteNote(id);
    if (status === 204) res.status(200).json(message);
    else res.status(status).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = notesController;
