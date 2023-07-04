const express = require('express');
const NotesRouter = require('./src/routes/notes');
const usersRouter = require('./src/routes/users');
const loginRouter = require('./src/routes/login');
const cors = require('cors');
const CheckLoggedUser = require('./middleware/checkLoggedUser');
const dotenv = require('dotenv').config({ path: '.env' });
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

//Cors config
app.use(cors());
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-Kew, Origin, X-Requested-With, Content-Type, Access-Control-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.get('/', (req, res) => res.send(`<h1>there is nothing here</h1>`));

app.use('/api/notes', CheckLoggedUser, NotesRouter);

//Crear controlador, servicios y middlewares para users :3
app.use('/api/users', CheckLoggedUser, usersRouter);

app.use('/api/login', loginRouter);

//Page not found handler
app.use((_, res) => {
  res.status(404).end('404');
});

const server = app.listen(PORT, () => {
  console.log(`yay! the server is running on port ${PORT}`);
});

module.exports = { app, server };
