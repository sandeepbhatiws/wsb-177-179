const express = require('express');
const { viewColors, viewMaterials, viewSubSubCategories, create, view, details, update, changeStatus, destory } = require('../../controllers/admin/products.controller');

const route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/products' })
const path = require('path');
const { viewCategories } = require('../../controllers/admin/subCategory.controller');
const { viewSubCategories } = require('../../controllers/admin/subSubCategory.controller');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products')
        },
        filename: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const uploads       = multer({ storage: storage })
    const uploadImages  = uploads.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 8 }])


    route.post('/view-colors', uploads.none(), viewColors);

    route.post('/view-materials', uploads.none(), viewMaterials);

    route.post('/view-categories', uploads.none(), viewCategories);

    route.post('/view-sub-categories', uploads.none(), viewSubCategories);

    route.post('/view-sub-sub-categories', uploads.none(), viewSubSubCategories);

    route.post('/create', uploadImages, create);

    route.post('/view', uploads.none(), view);

    route.post('/details/:id', uploads.none(), details);

    route.put('/update/:id', uploadImages, update);

    route.put('/change-status', uploads.none(), changeStatus);

    route.put('/delete', uploads.none(), destory);

    server.use('/api/admin/products', route);
}