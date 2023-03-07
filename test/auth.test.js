const request = require('supertest');
const app = require('../src/server').app;

const time = new Date().getTime();

beforeAll(async() => {
    // Create a test user for signup and login tests
    await request(app)
        .post('/signup')
        .send({ username: `testuser-${time}`, password: 'testpassword' })
        .expect(200);
});


describe('POST /login', () => {

    test('Login user with valid password', async() => {
        const res = await request(app)
            .post('/login')
            .send({
                username: `testuser-${time}`,
                password: `testpassword`
            })
            .expect(200);

        expect(res.body.token != undefined).toBe(true);
    });

    test('Login user with invalid password', async() => {
        const res = await request(app)
            .post('/login')
            .send({
                username: `testuser-${time}`,
                password: `testpassword11`
            })
            .expect(401);

        expect(res.body.message == 'Username or password is incorrect').toBe(true);
    });
});