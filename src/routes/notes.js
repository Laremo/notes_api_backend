const express = require('express');
const cors = require('cors');
const router = express();

//temporal testing data
let notes = [
  {
    id: 1,
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

//get All notes
router.get('', cors(), (_, res) => {
  res.json(notes);
});

//get one note
router.get('/:id', cors(), (req, res) => {
  const note = notes.find((note) => note.id === +req.params.id);
  if (!note) res.status(404).send('<h3> La nota no existe!</h3>');
  res.status(200).json(note);
});

//update note
router.put('/:id', cors(), (req, res) => {
  const { note } = req.body;
  if (!note) res.status(400).json({ error: 'missing note' });
  notes = notes.map((nt) => {
    if (nt.id === note.id) {
      return note;
    }
    return nt;
  });
  res.status(200).json(note);
});

//add new note
router.post('/', cors(), (req, res) => {
  console.log(req.body);
  const { note: noteToAdd } = req.body;

  if (!noteToAdd || !noteToAdd.content)
    return res.status(400).json({
      error: 'content is missing',
    });

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  noteToAdd.id = maxId + 1;
  noteToAdd.date = new Date().toISOString();
  noteToAdd.important =
    typeof noteToAdd.important === 'undefined' ? false : noteToAdd.important;
  notes.push(noteToAdd);

  res.status(201).json(noteToAdd);
});

//delete a note
router.delete('/:id', cors(), (req, res) => {
  notes = notes.filter((note) => note.id !== +req.params.id);
  console.log(notes);
  res.status(204).end();
});

module.exports = router;
