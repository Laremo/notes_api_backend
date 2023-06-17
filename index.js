const express = require('express');
const NotesRouter = require('./src/routes/notes');
const cors = require('cors');

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

app.get('/', (req, res)=> res.send(`<h1>there is nothing here</h1>`));

app.use('/api/notes', NotesRouter);

//Page not found handler
app.use((_, res) => {
  res.status(404).end('404');
});

app.listen(PORT, () => {
  console.log(`yay! the server is running on port ${PORT}`);
});
