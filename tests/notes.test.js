const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../index');

const api = supertest(app);

test('Notes are recieved in json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  console.log('mongo closed');
  server.close();
  console.log('server closed');
});
