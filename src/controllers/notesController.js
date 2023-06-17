const notesService = require('../services/notesService');
const notesController = {};

notesController.SaveNote = (req, res) => {
  //use service with try
  try {
    console.log(`L+ogica`);
  } catch (error) {
    console.log();
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

module.exports = notesController;
