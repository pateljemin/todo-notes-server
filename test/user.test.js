const request = require('supertest');
const app = require('../src/server').app;

describe('POST /signup', () => {
    const time = new Date().getTime();

    test('create user with invalid body', async() => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: `Test User ${time}`,
            })
            .expect(400);

        expect(res.body.message == 'Username and password are required').toBe(true);
    });

    test('create user', async() => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: `Test User ${time}`,
                password: "1234"
            })
            .expect(200);

        expect(res.body.message == 'User created').toBe(true);
    });

    test('user already exist', async() => {
        const res = await request(app)
            .post('/signup')
            .send({
                username: `Test User ${time}`,
                password: "1234"
            })
            .expect(409);

        expect(res.body.message == 'Username is already taken').toBe(true);
    });
});