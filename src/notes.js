import { getDB, insertDB, saveDB } from './db.js';

export const getNotes = async () => {
    try {
        const { notes } = await getDB();
        return notes;
    } catch (error) {
        throw new Error(`Could not get notes: ${error.message}`);
    }
};

export const getNote = async (id) => {
    try {
        const { notes } = await getDB();
        return notes[id];
    } catch (error) {
        throw new Error(`Could not get note: ${error.message}`);
    }
};

export const findNotes = async (query) => {
    try {
        const { notes } = await getDB();
        return notes.filter((note) =>
            note.content.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        throw new Error(`Could not find notes: ${error.message}`);
    }
};

export const createNote = async (note, tags) => {
    try {
        const newNote = { tags, id: Date.now(), content: note };
        await insertDB(newNote);
        return newNote;
    } catch (error) {
        throw new Error(`Could not create note: ${error.message}`);
    }
};

export const updateNote = async (id, note, tags) => {
    try {
        const { notes } = await getDB();
        notes[id] = { note, tags };
        await saveDB(db);
        return notes[id];
    } catch (error) {
        throw new Error(`Could not update note: ${error.message}`);
    }
};

export const deleteNote = async (id) => {
    try {
        const { notes } = await getDB();
        const match = notes.find((note) => note.id === id);
        if (match) {
            const newNotes = notes.filter((note) => note.id !== id);
            await saveDB({ notes: newNotes });
        }
        return match;
    } catch (error) {
        throw new Error(`Could not delete note: ${error.message}`);
    }
};

export const removeAllNotes = () => saveDB({ notes: [] });
