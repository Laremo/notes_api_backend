const mongoose = require('mongoose');
const NotesModel = require('../models/NotesSchema');
const dbNotesService = {};
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

let savedNotes = [
  {
    id: 9,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbNotesService.getAllNotes = async () => {
  try {
    const notes = await NotesModel.find();
    return notes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

dbNotesService.getOneNote = async (id) => {
  try {
    const note = await NotesModel.find({ id: id });
    return note;
  } catch (error) {
    console.timeLog(error);
    throw new Error(error);
  }
};

dbNotesService.saveNote = async (note, isNew = true) => {
  try {
    const retrievedNotes = await dbNotesService.getAllNotes();
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

    //use Update({id: note.id}, {set:{datos}})
    // const retrievedNote = await NotesModel.findOne({ id: note.id });
    // if (!retrievedNote) return { result: 0 };
    const result = await NotesModel.findOneAndUpdate(
      { id: note.id },
      { content: note.content, important: note.important },
      { new: true }
    );
    if (!result) return { result: 0 };
    else return { result: 1, note: result };
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.DeleteNote = async (id) => {
  try {
    const indexToEliminate = savedNotes.findIndex((note) => note.id === id);
    if (indexToEliminate === -1) return { result: 0 };

    const notes = savedNotes.filter((note) => note.id !== id);
    savedNotes = notes;

    return { result: 1 };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = dbNotesService;
