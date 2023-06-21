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

notesService.getOneNote = (id) => {
  try {
    const note = dbNotesService.getOneNote(id);
    if (!note) return { status: 204, note: 'Note does not exist' };
    return { status: 200, note };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

notesService.SaveNote = (noteToSave) => {
  try {
    const { result, note } = dbNotesService.saveNote(noteToSave);
    if (result === 1) return { status: 200, response: 'Saved changes', note };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = notesService;
