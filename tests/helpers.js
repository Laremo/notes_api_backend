const supertest = require('supertest');
const { app } = require('../index');
const api = supertest(app);

const initialNotes = [
  { id: 1, content: 'Nota Uno', important: true, date: new Date() },
  { id: 2, content: 'Nota Dos', important: false, date: new Date() },
];

module.exports = { initialNotes, api };
