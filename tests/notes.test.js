import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { createNote, getNotes, deleteNote } = await import('../src/notes.js');

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});

test('createNote inserts data and return it', async () => {
    const note = {
        id: 1,
        content: 'Content of the note',
        tags: ['tag1', 'tag2'],
    };

    insertDB.mockReturnValueOnce(note);
    const result = await createNote(note.content, note.tags);
    expect(result.content).toEqual(note.content);
    expect(result.tags).toEqual(note.tags);
});

test('getAllNotes returns all notes', async () => {
    const mock_db = {
        notes: [
            { id: 1, content: 'Content 1', tags: ['tag1', 'tag2'] },
            { id: 2, content: 'Content 2', tags: ['tag3', 'tag4'] },
        ],
    };

    getDB.mockReturnValueOnce(mock_db);
    const result = await getNotes();
    expect(result).toEqual(mock_db.notes);
});

test('removeNote does nothing when id is not passed', async () => {
    const mock_db = {
        notes: [
            { id: 1, content: 'Content 1', tags: ['tag1', 'tag2'] },
            { id: 2, content: 'Content 2', tags: ['tag3', 'tag4'] },
        ],
    };

    getDB.mockReturnValueOnce(mock_db);
    await deleteNote();
    expect(saveDB).not.toBeCalled();
});