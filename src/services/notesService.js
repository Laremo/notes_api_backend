const dbNotesService = require('../database/dbNotesService');
const dbUserService = require('../database/dbUsersService');
const notesService = {};

const cleanNoteData = ({ id, content, important, date, user }) => {
  return { id, content, important, date, user };
};

notesService.SaveNote = async (noteToSave) => {
  try {
    const user = await dbUserService.getUserByID(noteToSave.user);
    if (!user) return { status: 400, response: 'User does not exist' };
    const { result, note } = await dbNotesService.saveNote(
      noteToSave,
      true,
      user
    );
    if (result === 1) return { status: 200, response: 'Saved changes', note };
  } catch (error) {
    throw error;
  }
};

notesService.UpdateNote = async (noteToUpdate) => {
  try {
    const { result, note } = await dbNotesService.saveNote(noteToUpdate, false);
    if (result === 1)
      return {
        status: 200,
        response: 'Saved changes',
        note: cleanNoteData(note),
      };
    if (result === 0)
      return { status: 400, response: 'This note does not exist' };
  } catch (error) {
    throw error;
  }
};

notesService.getAllNotes = async () => {
  try {
    const notes = await dbNotesService.getAllNotes();
    if (notes.length === 0) return 'No saved Notes';
    return notes;
  } catch (error) {
    throw error;
  }
};

notesService.getOneNote = async (id) => {
  try {
    const note = await dbNotesService.getOneNote(id);
    if (!note.length) return { status: 404, note: 'Note does not exist' };
    return { status: 200, note: cleanNoteData(note[0]) };
  } catch (error) {
    throw error;
  }
};

notesService.DeleteNote = async (id) => {
  try {
    const { result } = await dbNotesService.DeleteNote(id);
    if (result === 0) return { status: 404, message: 'Note does not exist' };

    return { status: 204, message: 'Note Successfully deleted' };
  } catch (error) {
    throw error;
  }
};

module.exports = notesService;
