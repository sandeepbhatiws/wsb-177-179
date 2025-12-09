const express = require('express');
const { create, view, details, update, changeStatus, destory } = require('../../controllers/admin/material.controller');

const route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads' })

module.exports = server => {

    route.post('/create', create);

    route.post('/view', view);

    route.post('/details/:id', details);

    route.put('/update/:id', update);

    route.put('/change-status',upload.none(), changeStatus);

    route.put('/delete', destory);

    server.use('/api/admin/material', route);
}