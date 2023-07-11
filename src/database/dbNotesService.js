const mongoose = require('mongoose');
const NotesModel = require('../models/NotesSchema');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const dbNotesService = {};

const { MONGO_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGO_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbNotesService.getAllNotes = async () => {
  try {
    const notes = await NotesModel.find({}).populate('user', {
      username: 1,
      name: 1,
      _id: 0,
    });
    const cleanedNotes = notes.map((note) => {
      return {
        _id: note._id,
        content: note.content,
        important: note.important,
        date: note.date,
        user: note.user,
      };
    });
    return cleanedNotes;
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.getOneNote = async (id) => {
  try {
    const note = await NotesModel.find({ _id: id });
    return note;
  } catch (error) {
    throw new Error(error);
  }
};

dbNotesService.saveNote = async (note, isNew = true, user = undefined) => {
  try {
    if (!note?.date) note.date = new Date();
    if (isNew) {
      const toSave = new NotesModel({
        content: note.content,
        date: note.date,
        important: note.important,
        user: user._id,
      });

      const savedNote = await toSave.save();
      user.notes = user.notes.concat(savedNote._id);
      user.save();
      return { result: 1, note: savedNote };
    }

    const result = await NotesModel.findOneAndUpdate(
      { _id: note._id },
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
    const result = await NotesModel.findOneAndRemove({ _id: id });
    if (!result) return { result: 0 };
    return { result: 1 };
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = dbNotesService;
