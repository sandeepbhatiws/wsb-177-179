const express = require('express');
const { viewSubCategories, create, view, details, update, changeStatus, destory } = require('../../controllers/admin/subSubCategory.controller');

const route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/categories' })
const path = require('path');
const { viewCategories } = require('../../controllers/admin/subCategory.controller');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/categories')
        },
        filename: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const uploads       = multer({ storage: storage })
    const singleImage   = uploads.single('image');

    route.post('/view-categories', uploads.none(), viewCategories);

    route.post('/view-sub-categories', uploads.none(), viewSubCategories);

    route.post('/create', singleImage, create);

    route.post('/view', uploads.none(), view);

    route.post('/details/:id', uploads.none(), details);

    route.put('/update/:id', singleImage, update);

    route.put('/change-status', uploads.none(), changeStatus);

    route.put('/delete', uploads.none(), destory);

    server.use('/api/admin/sub-sub-categories', route);
}