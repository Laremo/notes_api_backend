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

// Connection

// console.log(process.env);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => console.log(con.models));

dbNotesService.getAllNotes = () => {
  try {
    const firstNote = new NotesModel({
      id: 10,
      content: 'First Note on MONGO',
      important: false,
    });
    if (firstNote.save()) console.log('saved!');
    else console.log('could not save!');

    return savedNotes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

dbNotesService.getOneNote = (id) => {
  try {
    const note = savedNotes.filter((note) => note.id === id);
    return note;
  } catch (error) {
    console.timeLog(error);
    throw new Error(error);
  }
};

dbNotesService.saveNote = (note, isNew = true) => {
  try {
    if (isNew) {
      //Obtener el máximo Id
      const { id } = savedNotes.reduce(
        (note, currentNote) => (note.id > currentNote.id ? note : currentNote),
        0
      );
      note.id = id + 1;
      savedNotes.push(note);
      return { result: 1, note };
    }
    console.log(note);
    const index = savedNotes.findIndex((nt) => nt.id === note.id);
    if (index === -1) return { result: 0 };
    savedNotes[index] = note;
    return { result: 1, note };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

dbNotesService.DeleteNote = (id) => {
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
