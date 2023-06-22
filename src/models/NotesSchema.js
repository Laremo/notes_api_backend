const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  content: { type: String, required: true },
  important: { type: Boolean, required: true },
});

const Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
