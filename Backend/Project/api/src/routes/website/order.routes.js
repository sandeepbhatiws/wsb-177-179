const express = require('express');
const { placeOrder, orderStatus, view } = require('../../controllers/website/order.controller');

const route = express.Router();
const multer = require('multer')
const uploads = multer({ dest: 'uploads/' })
const path = require('path');

module.exports = server => {

    route.post('/place-order', uploads.none(), placeOrder);

    route.put('/update-status', uploads.none(), orderStatus);

    route.post('/view', uploads.none(), view);

    server.use('/api/website/orders', route);
}