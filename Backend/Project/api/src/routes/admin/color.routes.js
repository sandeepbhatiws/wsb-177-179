const express = require('express');
const { create, view, details, update, changeStatus, destory } = require('../../controllers/admin/color.controller');

const route = express.Router();

module.exports = server => {

    route.post('/create', create);

    route.post('/view', view);

    route.post('/details/:id', details);

    route.put('/update/:id', update);

    route.put('/change-status', changeStatus);

    route.put('/delete', destory);

    server.use('/api/admin/color', route);
}