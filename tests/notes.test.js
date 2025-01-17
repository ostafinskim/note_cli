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
