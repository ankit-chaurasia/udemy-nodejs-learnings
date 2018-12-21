const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const title = {
  description: 'Title of note',
  demand: true,
  alias: 't'
};
const body = {
  description: 'Body of note',
  demand: true,
  alias: 'b'
};
const argv = yargs
  .command('add', 'Add a new note', {
    title,
    body
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', { title })
  .command('remove', 'Remove a note', { title })
  .help().argv;

let command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  notes.logNote(note, 'created');
} else if (command === 'remove') {
  const note = notes.removeNote(argv.title);
  notes.logNote(note, 'deleted');
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  notes.logNote(note, 'read');
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach(note => {
    notes.logNote(note, 'list');
  });
}
