const dbNotesService = {};

let savedNotes = [
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

dbNotesService.getAllNotes = () => {
  try {
    const notes = savedNotes;
    return notes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

dbNotesService.getOneNote = (id) => {
  try {
    const note = savedNotes.filter((note) => note.id === id);
    return note;
  } catch (error) {
    console.timeLog(error);
    throw new Error(error);
  }
};

dbNotesService.saveNote = (note, isNew = true) => {
  try {
    if (isNew) {
      const id = savedNotes.reduce(
        (id, currentId) => (id > currentId ? id : currentId),
        0
      );
      console.log(id);
      note.id = id + 1;
      savedNotes.push(note);
      return { result: 1, note };
    }
    const index = savedNotes.findIndex((nt) => nt.id === note.id);
    savedNotes[index] = note;
    return { result: 1, note };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = dbNotesService;
