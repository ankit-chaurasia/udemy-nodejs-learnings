// let obj = { name: 'Ankit' };
// let stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// let personString = '{"name":"ankit"}';
// let person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');
let originalNote = {
  title: 'Some title',
  body: 'some body'
};

// Original Note string
const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
const note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
