const express = require('express');
const NotesRouter = require('./src/routes/notes');
const cors = require('cors');

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('<h1>Hello there</h1>');
});

app.use('/api/notes', NotesRouter);

app.use((_, res) => {
  res.status(404).end('404');
});

app.listen(PORT, () => {
  console.log('server listening on port ', PORT);
});
