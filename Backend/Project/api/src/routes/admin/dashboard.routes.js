const express = require('express');
const { view } = require('../../controllers/admin/dashboard.controller');

const route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads' })
const path = require('path');

module.exports = server => {

    route.post('/view', upload.none(), view);

    server.use('/api/admin/dashboard', route);
}