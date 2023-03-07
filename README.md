## Purpose
Node Js server: All APIs for todo notes. Create, Update, Delete, Get by ID and Get all for the logged In user.

## Setup
1. Install NodeJs: https://nodejs.org/en/download/
2. Go to the root directory of the project.
3. You can change the value in `env_sample` file as per your requirement and rename it with `.env`.
4. Run the following commands:
```
npm install
npm run start
```

### Code Architecture

1. In `src` directory you will get the entire code.
2. In `src/middlewares` directory you will get all the middlewares.
3. In `src/controllers` directory you will get all the controllers.
4. In `src/services` directory you will get all the services. 
5. In `src/router.js` file you will get all the routes.
6. In `src/server.js` file you will get how server is created.
7. In `src/db` directory you will get `.json` files for different entities.
8. In `test` directory you will get all the apis test cases. 

### Request flow
Request flow will be like : `server.js -> router.js -> middleware -> controller -> service`

### Log Format
You will find the logs in this format `[fileName][methodName] Error message` so with this format it becomes easy to locate the errors.
## API Documentation
### Create a User

Request
```
POST /signup
{
    "username":"Jemin",
    "password":"123"
}
```
### Login User
Request

You will get token in response
```
POST /login
{
    "username":"Jemin",
    "password":"123"
}
```

### Create a Note
Request

You need to pass token in Authorization header.
```
POST /notes
{
    "title":"Note 1",
    "content":"Hi This is my Note"
}
```
### Update a Note
Request

You need to pass token in Authorization header.
```
PUT /notes/:id
{
    "title":"Note 1",
    "content":"Hi This is my Note"
}
```
### Get a Note of the given Id
Request

You need to pass token in Authorization header.
You will get note in response. Id should be belong to logged in user only otherwise unauthorize will come.
```
GET /notes/:id
```
### Get all notes of the user

Request

You need to pass token in Authorization header.
You will get all the notes in response of the logged in user.
```
GET /notes/
```

## Test

To run test cases run following command
```
npm run test
```

