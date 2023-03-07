const fs = require('fs');
const path = require('path');
const NOTE_FILE = path.join(__dirname, '..', 'db', 'notes.json');

const addNoteToDB = async(title, content, userId) => {
    try {
        const notes = JSON.parse(fs.readFileSync(NOTE_FILE));

        // Add the new note
        const id = Math.max(0, ...notes.map((note) => note.id)) + 1;
        notes.push({ id, title, content, userId });

        // Save the updated notes to the file
        fs.writeFileSync(NOTE_FILE, JSON.stringify(notes));
        return { isSuccess: true, note: { id, title, content, userId } };
    } catch (err) {
        console.log(`[noteService][addNote] Error occurred while adding note: ${err}`)
        return { isSuccess: false };
    }
}

const updateNoteToDB = async(id, title, content, userId) => {
    try {
        // Load the notes from the file
        const notes = JSON.parse(fs.readFileSync(NOTE_FILE));

        // Find the note with the specified ID
        const noteIndex = notes.findIndex((note) => note.id === id);
        if (noteIndex === -1) {
            return { isFound: false, isSuccess: true };
        }
        // Check that the user is authorized to update the note
        const note = notes[noteIndex];
        if (note.userId !== userId) {
            return { isAuthorized: false, isSuccess: true }
        }

        // Update the note
        notes[noteIndex] = { id, title, content, userId: note.userId };

        // Save the updated notes to the file
        fs.writeFileSync(NOTE_FILE, JSON.stringify(notes));
        return { isFound: true, isAuthorized: true, isSuccess: true, note: { id, title, content, userId } };

    } catch (err) {
        console.log(`[noteService][updateNote] Error occurred while updating note: ${err}`)
        return { isSuccess: false }
    }
}

const deleteNoteFromDB = async(id, userId) => {
    try {
        // Load the notes from the file
        const notes = JSON.parse(fs.readFileSync(NOTE_FILE));

        // Find the note with the specified ID
        const noteIndex = notes.findIndex((note) => {
            return note.id === id
        });
        if (noteIndex === -1) {
            return { isDeleted: false, isSuccess: true, isExists: false };
        }

        // Check that the user is authorized to update the note
        const note = notes[noteIndex];
        if (note.userId !== userId) {
            return { isAuthorized: false, isSuccess: true, isExists: true }
        }

        // Update the note
        const filteredNotes = notes.filter((note) => {
            return note.id !== id;
        });

        // Save the updated notes to the file
        fs.writeFileSync(NOTE_FILE, JSON.stringify(filteredNotes));
        return { isDeleted: true, isAuthorized: true, isSuccess: true, isExists: true };

    } catch (err) {
        console.log(`[noteService][deleteNote] Error occurred while deleting note: ${err}`)
        return { isSuccess: false }
    }
}

const getNoteFromDB = async(id, userId) => {
    try {
        const notes = JSON.parse(fs.readFileSync(NOTE_FILE));
        let foundNote;
        const filteredNotes = notes.filter((note) => {
            return note.id === id && note.userId === userId;
        });
        if (filteredNotes && filteredNotes.length > 0) {
            foundNote = filteredNotes[0];
        }
        return { note: foundNote, isSuccess: true };
    } catch (err) {
        console.log(`[noteService][addNote] Error occurred while getting note: ${err}`)
        return { isSuccess: false };
    }
}

const getNoteOfUserFromDB = async(userId) => {
    try {
        const notes = JSON.parse(fs.readFileSync(NOTE_FILE));

        const filteredNotes = notes.filter((note) => note.userId === userId);

        return { notes: filteredNotes, isSuccess: true };
    } catch (err) {
        console.log(`[noteService][getNoteOfUser] Error occurred while getting user note: ${err}`)
        return { isSuccess: false };
    }
}

module.exports = {
    addNoteToDB,
    updateNoteToDB,
    deleteNoteFromDB,
    getNoteFromDB,
    getNoteOfUserFromDB
}