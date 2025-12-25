const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match : /^[a-zA-Z ]{2,15}$/,
        // validate: {
        // validator: async function(v) {
        //     const name = await this.constructor.findOne({ name: v, deleted_at : null });
        //     return !name;
        // },
        // message: props => `The specified name is already in use.`
        // }
    },
    slug : {
        type : String,
        default : '',
        required : [true, 'Slug is required']
    },
    parent_category_id : {
        type : String,
        required : [true, 'Parent category is required'],
        ref : 'categories'
    },
    sub_category_id : {
        type : String,
        required : [true, 'Sub category is required'],
        ref : 'sub_categories'
    },
    image : {
        type : String,
        default : ''
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

const subSubCategoryModel = mongoose.model('sub_sub_categories', schema);

module.exports = subSubCategoryModel;