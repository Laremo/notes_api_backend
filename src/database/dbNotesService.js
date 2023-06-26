const mongoose = require('mongoose');
const NotesModel = require('../models/NotesSchema');
const dbNotesService = {};
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const { MONGO_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGO_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbNotesService.getAllNotes = async () => {
  try {
    const notes = await NotesModel.find();
    const cleanedNotes = notes.map((note) => {
      return {
        id: note.id,
        content: note.content,
        important: note.important,
        date: note.date,
      };
    });
    return cleanedNotes;
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.getOneNote = async (id) => {
  try {
    const note = await NotesModel.find({ id: id });
    return note;
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.saveNote = async (note, isNew = true) => {
  try {
    const retrievedNotes = await dbNotesService.getAllNotes();
    if (!note?.date) note.date = new Date();
    if (isNew) {
      retrievedNotes.forEach((nt) => {
        if (nt.content === note.content && nt.important === note.important)
          throw new Error('This note already exists');
      });
      //Obtener el máximo Id
      const { id } = retrievedNotes.reduce(
        (note, currentNote) => (note.id > currentNote.id ? note : currentNote),
        { id: 0 }
      );
      note.id = id + 1;
      const toSave = new NotesModel(note);
      if (toSave.save()) return { result: 1, note };
      return { result: 0 };
    }

    const result = await NotesModel.findOneAndUpdate(
      { id: note.id },
      { content: note.content, important: note.important },
      { new: true } //return the updated document
    );
    if (!result) return { result: 0 };
    else return { result: 1, note: result };
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.DeleteNote = async (id) => {
  try {
    const result = await NotesModel.findOneAndRemove({ id: id });
    if (!result) return { result: 0 };
    return { result: 1 };
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = dbNotesService;
