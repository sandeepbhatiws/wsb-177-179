const express = require('express');
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

server.use('/uploads/categories', express.static('uploads/categories'));

// Website Routes


// Application Routes


// Admin Routes
require('./src/routes/admin/material.routes.js')(server);
require('./src/routes/admin/color.routes.js')(server);
require('./src/routes/admin/category.routes.js')(server);




server.listen(8000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/monsta_api').then(() => console.log('Connected!'));
    console.log('Server is working Fine');
})