const express = require('express');

const route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/users' })
const path = require('path');
const { register, login, viewProfile, updateProfile, changePassword, forgotPassword, resetPassword } = require('../../controllers/website/user.controller');

module.exports = server => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/users')
        },
        filename: function (req, file, cb) {
            var extension = path.extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + extension)
        }
    })

    const uploads = multer({ storage: storage })

    const singleImage = uploads.single('image');


    route.post('/register', uploads.none(), register);

    route.post('/login', uploads.none(), login);

    route.post('/view-profile', uploads.none(), viewProfile);

    route.put('/update-profile', singleImage, updateProfile);

    route.put('/change-password', uploads.none(), changePassword);

    
    route.post('/forgot-password', uploads.none(), forgotPassword);

    route.put('/reset-password', uploads.none(), resetPassword);

    server.use('/api/website/users', route);
}