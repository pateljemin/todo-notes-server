const request = require('supertest');
const app = require('../src/server').app;

let token;
let noteId;
const time = new Date().getTime();

beforeAll(async() => {
    // Create a test user for signup and login tests
    await request(app)
        .post('/signup')
        .send({ username: `testuser-${time}`, password: 'testpassword' })
        .expect(200);

    // Get a token for the test user for authenticated tests
    const loginRes = await request(app)
        .post('/login')
        .send({ username: `testuser-${time}`, password: 'testpassword' })
        .expect(200);

    token = loginRes.body.token;
});


describe('Notes API', () => {

    describe('POST /notes', () => {
        test('should create a new note', async() => {
            const note = {
                title: 'New Note',
                content: 'Content of New Note',
            };
            const res = await request(app)
                .post('/notes')
                .set('Authorization', token)
                .send(note)
                .expect(200);
            noteId = res.body.id;
            expect(res.body.id).toBeDefined();
            expect(res.body.title).toBe(note.title);
            expect(res.body.content).toBe(note.content);
        });

        test('should not create a new note with missing data', async() => {
            const note = {
                title: 'New Note',
            };
            const res = await request(app)
                .post('/notes')
                .set('Authorization', token)
                .send(note)
                .expect(400);
            expect(res.body.message).toBe('Missing title or content');
        });
    });

    describe('PUT /notes/:id', () => {
        test('should update a note by id', async() => {
            const note = {
                title: 'Updated Note',
                content: 'Content of Updated Note',
            };
            const res = await request(app)
                .put(`/notes/${noteId}`)
                .set('Authorization', token)
                .send(note)
                .expect(200);

            expect(res.body.id).toBe(noteId);
            expect(res.body.title).toBe(note.title);
            expect(res.body.content).toBe(note.content);
        });

        test('should not update a new note with missing data', async() => {
            const note = {
                title: 'New Note',
            };
            const res = await request(app)
                .put(`/notes/${noteId}`)
                .set('Authorization', token)
                .send(note)
                .expect(400);
            expect(res.body.message).toBe('Missing title or content');
        });
    });

    describe('GET /notes', () => {
        test('should return an array of notes', async() => {
            const res = await request(app)
                .get('/notes')
                .set('Authorization', token)
                .expect(200);

            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('GET /notes/:id', () => {
        test('should return a note by id', async() => {
            const res = await request(app)
                .get(`/notes/${noteId}`)
                .set('Authorization', token)
                .expect(200);
            expect(res.body.id).toBe(noteId);
            expect(res.body.title).toBe('Updated Note');
            expect(res.body.content).toBe('Content of Updated Note');
        });

        test('should not return a note by invalid id', async() => {
            const res = await request(app)
                .get(`/notes/-1`)
                .set('Authorization', token)
                .expect(404);

            expect(res.body.message).toBe('Invalid Id');
        });
    });

    describe('DELETE /notes/:id', () => {
        test('should delete a note by id', async() => {
            await request(app)
                .delete(`/notes/${noteId}`)
                .set('Authorization', token)
                .expect(204);
            // Verify that the note has been deleted
            const res = await request(app)
                .delete(`/notes/${noteId}`)
                .set('Authorization', token)
                .expect(404);

            expect(res.body.message).toBe('Invalid Id');
        });
    });
});