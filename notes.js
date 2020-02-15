const fs = require('fs');

const readNote = (identifier) => {
    let notes = loadNotes();
    var fetchedNote;
    if (!isNaN(parseInt(identifier))) {
        fetchedNote = notes[identifier];
        if (fetchedNote) {
            printNote(fetchedNote, identifier);
        } else {
            console.log('Note with index ' + identifier + ' does not exist')
        }
    } else {
        fetchedNote = notes.find((note) => note.title === identifier);
        if (fetchedNote) {
            printNote(fetchedNote);
        } else {
            console.log('Note with title ' + identifier + ' does not exist')
        }
    }
}

const getNotes = () => {
    let notes = loadNotes();
    console.log('Your notes ------------->')
    notes.map((note, index, notes) => {
        if (index === 0) console.log('=============');
        printNote(note, index);
        if (index < notes.length - 1) {
            console.log('-------------');
        } else {
            console.log('=============')
        }
    });
}

const addNote = (title, body) => {
    let notes = loadNotes();
    let duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) {
        notes.push({ title, body});
        saveNotes(notes);
        console.log('Note with title "' + title +'" was added');
    } else {
        console.log('Note with title "' + title +'" already exists');
    }
}

const removeNote = (title) => {
    let notes = loadNotes();
    let editedNotes = notes.filter((note) => note.title !== title);
    if (editedNotes.length < notes.length) {
        saveNotes(editedNotes);
        console.log('Note with title "' + title +'" was removed');
    } else {
        console.log('Note with title "' + title +'" does not exist');
    }
}

const printNote = (note, index) => {
    if (!!index) console.log('Note index: ' + index);
    console.log('Title: ' + note.title);
    console.log('Body: ' + note.body);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    readNote
}
