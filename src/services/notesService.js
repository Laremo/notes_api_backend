const dbNotesService = require('../database/dbNotesService');
const notesService = {};

notesService.getAllNotes = () => {
  try {
    const notes = dbNotesService.getAllNotes();
    if (notes.length === 0) return { message: 'No saved Notes' };
    return notes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = notesService;
