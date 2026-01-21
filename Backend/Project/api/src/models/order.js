const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true
    },
    order_number : {
        type : String,
        default : ''
    },
    order_id : {
        type : String,
        default : ''
    },
    payment_id : {
        type : String,
        default : ''
    },
    name : {
        type : String,
        required : [true, 'Name is required'],
        match : /^[a-zA-Z ]{2,15}$/,
    },
    mobile_number : {
        type : Number,
        required : [true, 'Mobile Number is required'],
        match : /^[0-9]{8,15}$/,
    },
    billing_address : {
        type : Object,
        required : [true, 'Billing Address is required'],
    },
    shipping_address : {
        type : Object,
        required : [true, 'Shipping Address is required'],
    },
    order_notes : {
        type : String,
        default : ''
    },
    product_info : {
        type : Array,
        required : [true, 'Product Info is required'],
        default : []
    },
    total_amount : {
        type : Number,
        required : [true, 'Total Amount is required'],
        match : /^[0-9]{1,15}$/,
    },
    discount_amount : {
        type : Number,
        required : [true, 'Discount Amount is required'],
        match : /^[0-9]{1,15}$/,
    },
    net_amount : {
        type : Number,
        required : [true, 'Net Amount is required'],
        match : /^[0-9]{1,15}$/,
    },
    payment_status : {
        type : Number,
        default : 1,   // 1- Pending 2- Success 3 - Failed
    },
    order_status : {
        type : Number,
        default : 1, // 1- In Process 2-  Accepted 3- Shipping 4- Delivery 5- Cancel 6 - Failed
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

const orderModel = mongoose.model('orders', schema);

module.exports = orderModel;