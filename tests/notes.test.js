import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
    insertDB: jest.fn(),
    getDB: jest.fn(),
    saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getNotes, deleteNote } = await import('../src/notes.js');

beforeEach(() => {
    insertDB.mockClear();
    getDB.mockClear();
    saveDB.mockClear();
});

test('newNote inserts data and return it', async () => {
    const newNote = {
        id: 1,
        content: 'Content of the note',
        tags: ['tag1', 'tag2'],
    };

    insertDB.mockReturnValueOnce(newNote);
    const result = await newNote(newNote.content, newNote.tags);
    expect(result).toEqual(newNote);
});
