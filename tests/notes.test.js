const supertest = require('supertest');
const app = require('../index');

const api = supertest(app);

test('Notes are recieved in json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});
