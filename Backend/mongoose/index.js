const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express(); // make Executable Function

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());

server.use(cors());


server.get('/', (request, response) => {
    response.send('Server is working Fine');
});

require('./src/routes/category.routes.js')(server);
require('./src/routes/color.routes.js')(server);


server.listen(5001, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/monsta_offline').then(() => console.log('Connected!'));
    console.log('Server is working Fine');
})