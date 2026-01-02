const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
        match : /^[a-zA-Z ]{2,15}$/,
    },
    slug : {
        type : String,
        default : '',
        required : [true, 'Slug is required']
    },
    material_id : {
        type : String,
        required : [true, 'Material is required'],
        ref : 'materials'
    },
    color_id : {
        type : String,
        required : [true, 'Color is required'],
        ref : 'colors'
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
    sub_sub_category_id : {
        type : String,
        required : [true, 'Sub sub category is required'],
        ref : 'sub_sub_categories'
    },
    image : {
        type : String,
        default : ''
    },
    images : {
        type : Array,
        default : []
    },
    actual_price : {
        type : Number,
        required : [true, 'Actual Price is required']
    },
    sale_price : {
        type : Number,
        required : [true, 'Sale price is required']
    },
    short_description : {
        type : String,
        default : '',
        required : [true, 'Short Description is required']
    },
    long_description : {
        type : String,
        default : '',
        required : [true, 'Long Description is required']
    },
    code : {
        type : String,
        default : '',
        required : [true, 'Code is required']
    },
    dimension : {
        type : String,
        default : '',
        required : [true, 'Dimension is required']
    },
    delivery_days : {
        type : String,
        default : '',
        required : [true, 'Delivery days is required']
    },
    is_new_arrivals : {
        type : Number,
        default : 1, // 1 - Yes 2 - No
    },
    is_featured : {
        type : Number,
        default : 1,
    },
    is_on_sale : {
        type : Number,
        default : 1,
    },
    is_best_selling : {
        type : Number,
        default : 1,
    },
    is_upsell : {
        type : Number,
        default : 1,
    },
    is_trending : {
        type : Number,
        default : 1,
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

const productModel = mongoose.model('products', schema);

module.exports = productModel;