const mongoose = require('mongoose');
const { server } = require('../index');
const { api } = require('./helpers');

const Note = require('../src/models/NotesSchema');
const { initialNotes } = require('./helpers');

beforeEach(async () => {
  await Note.deleteMany({}).then(() => {
    initialNotes.forEach(async (note) => {
      await new Note(note).save();
    });
  });
});

test('Notes are recieved in json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('There are two notes', async () => {
  const resp = await api.get('/api/notes');
  expect(resp.body.notes).toHaveLength(initialNotes.length);
});

test('A note with no content is not added', async () => {
  const badNote = {
    note: { content: '', important: true },
  };

  await api
    .post('/api/notes')
    .send(badNote)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/notes');
  expect(response.body.notes).toHaveLength(initialNotes.length);
});

test('A new valid note', async () => {
  const newNote = {
    note: { content: 'new valid Note', important: true },
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const resp = await api.get('/api/notes');
  expect(resp.body.notes).toHaveLength(initialNotes.length + 1);
  expect(resp.body.notes[2].content).toContain(newNote.note.content);
});

afterAll(() => {
  mongoose.connection.close();
  console.log('mongo closed');
  server.close();
  console.log('server closed');
});
