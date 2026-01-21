const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match : /^[a-zA-Z ]{2,15}$/,
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        validate: {
            validator: async function(v) {
                const email = await this.constructor.findOne({ email: v, deleted_at : null, role_type : 'user' });
                return !email;
            },
            message: props => `The specified email is already in use.`
        }
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
    },
    address : {
        type : String,
        default : ''
    },
    mobile_number : {
        type : String,
        default : ''
    },
    
    gender : {
        type : String,
        default : '',  // 1 - male 2 - female
        enum : ['', 'Male', 'Female']
    },
    role_type : {
        type : String,
        default : 'user',
        enum : ['user', 'admin']
    },
    order : {
        type : Number,
        default : 0,
        min : [0, 'Minimum value must be greather than 0.'],
        max : [1000, 'Maximum value must be less than 1000.']
    },
    status : {
        type : Boolean,
        default : true
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    updated_at : {
        type : Date,
        default : Date.now()
    },
    deleted_at : {
        type : Date,
        default : ''
    }
});

const userModel = mongoose.model('users', schema);

module.exports = userModel;