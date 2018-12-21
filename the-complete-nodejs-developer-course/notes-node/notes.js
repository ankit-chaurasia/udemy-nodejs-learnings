const fs = require('fs');

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };
  let duplicateNotes = notes.filter(note => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => fetchNotes();

const getNote = title => fetchNotes().filter(note => note.title === title)[0];

const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

const logNote = (note, action) => {
  if (note) {
    console.log(`Note ${action}`);
    console.log(`Title: ${note.title}\nBody: ${note.body}`);
  } else {
    if (action === 'created') {
      console.log('Note title already in use');
    } else {
      console.log('Note not found');
    }
  }
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
