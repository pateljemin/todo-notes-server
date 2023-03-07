require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router').router;

const app = express();

app.use(bodyParser.json()); // To read data in json format.

app.use(router);
module.exports = {
    app
}
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${port}`))
}