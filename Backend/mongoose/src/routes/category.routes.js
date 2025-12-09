const express = require('express');
const { create, view, update, destroy } = require('../controllers/category.controller.js');

const route = express.Router();

module.exports = server => {

    route.get('/create', create);

    route.get('/view', view);

    route.get('/update/:id', update);

    route.get('/delete/:id', destroy);

    server.use('/api/category', route);
}