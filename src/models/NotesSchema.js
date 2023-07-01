const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  content: { type: String, required: true },
  important: { type: Boolean, required: true },
  date: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Note = mongoose.model('Note', NotesSchema);

module.exports = Note;
