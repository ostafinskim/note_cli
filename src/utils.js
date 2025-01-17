export const listNotes = (notes) => {
    notes.forEach((note) => {
        const { id, content, tags } = note;
        console.log(`
        {
            Note ID: ${id}
            Note: ${content}
            Tags: [${tags.join(', ')}]
        }\n    
        `);
    });
};
