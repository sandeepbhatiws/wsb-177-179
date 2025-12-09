const express = require('express');
const { create, view, details, update, destroy } = require('../controllers/color.controller.js');

const route = express.Router();

module.exports = server => {

    route.post('/create', create);

    route.post('/view', view);

    route.post('/details/:id', details);

    route.put('/update/:id', update);

    route.delete('/delete/:id', destroy);


    server.use('/api/color', route);
}