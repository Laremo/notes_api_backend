const mongoose = require('mongoose');
const { server } = require('../index');
const { api } = require('./helpers');
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

describe('Creating new User', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('Pass', 10);
    const user = new User({
      username: 'nombbreusuario',
      name: 'nombre',
      passwordHash: passwordHash,
    });

    await user.save();
  });

  test('works as expected creating new user', async () => {
    const users = await User.find({});
    const usersAtStart = users.map((user) => user.toJSON());

    const newUser = {
      user: { username: 'laremo', name: 'laremo', password: 'hola' },
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const after = await User.find({});
    const usersAtEnd = after.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.user.username);
  });

  test('creation fails with proper statuscode and a message when missing user info', async () => {
    const users = await User.find({});
    const usersAtStart = users.map((user) => user.toJSON());

    const newUser = {
      user: { username: '', name: 'laremo', password: 'hola' },
    };
    const { body } = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const after = await User.find({});
    const usersAtEnd = after.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(body.savedUser).toContain('User info is missing');
  });

  test('creation fails with proper statuscode and a message when the username is taken already', async () => {
    const users = await User.find({});
    const usersAtStart = users.map((user) => user.toJSON());

    const newUser = {
      user: {
        username: 'nombbreusuario',
        name: 'nombre',
        password: 'hola',
      },
    };
    const { body } = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const after = await User.find({});
    const usersAtEnd = after.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
    expect(body.savedUser).toContain('This username is unavailable');
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});
