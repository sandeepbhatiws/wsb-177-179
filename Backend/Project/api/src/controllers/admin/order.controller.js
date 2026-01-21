const orderModel = require("../../models/order");
require('dotenv').config()
var jwt = require('jsonwebtoken');
var secretKey = '1234567890';
const Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

exports.placeOrder = async (request, response) => {

    var token = request.headers.authorization;
    var token = token.split(' ');

    try {
        var decoded = jwt.verify(token[1], secretKey);
    } catch (error) {
        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    }

    const dataSave = request.body;
    dataSave.user_id = decoded.userInfo._id;

    var totalOrders = await orderModel.find().countDocuments();
    dataSave.order_number = 'MONSTA_' + (1001 + totalOrders);

    await orderModel(dataSave)
        .save()
        .then(async(result) => {

            var orderInfo = await instance.orders.create({
                "amount": request.body.net_amount * 100,
                "currency": "INR",
                "receipt": result._id,
                "partial_payment": false,
            })

            await orderModel.updateOne({ _id : result._id},{ $set : {
                order_id : orderInfo.id
            } })

            orderInfoo = await orderModel.findById(result._id)

            const data = {
                _status: true,
                _message: 'Order placed succussfully.',
                orderInfo : orderInfo,
                _data: orderInfoo
            }

            response.send(data);
        })
        .catch((getError) => {

            console.log(getError);

            var errors = {};
            for (var i in getError.errors) {
                errors[i] = getError.errors[i].message
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errors,
                _data: ''
            }

            response.send(data);
        })
}

exports.view = async (request, response) => {

    var limit = 15;
    var skip = 0;
    var current_page = 1;

    console.log(process.env);

    if (request.body) {
        if (request.body.limit != undefined && request.body.limit != '') {
            limit = request.body.limit
        }
    }

    if (request.body) {
        if (request.body.page != undefined && request.body.page != '') {
            current_page = request.body.page,
                skip = (current_page - 1) * limit;
        }
    }

    const andCondition = [{
        deleted_at: null
    }];
    const orCondition = [];
    var filter = {};

    if (request.body) {
        if (request.body.name != '' && request.body.name != undefined) {
            var nameRegex = new RegExp(request.body.name, "i");
            andCondition.push({ name: nameRegex })
        }
    }

    if (andCondition.length > 0) {
        filter = { $and: andCondition }
    }

    if (orCondition.length > 0) {
        filter.$or = orCondition;
    }

    var total_records = await categoryModel.find(filter).countDocuments();

    await categoryModel.find(filter).select('name image slug order status').limit(limit).skip(skip)
        .sort({
            _id: 'desc'
        })
        .then((result) => {
            if (result.length > 0) {
                const data = {
                    _status: true,
                    _message: 'Record fetch succussfully.',
                    _image_path: process.env.category_image,
                    _paginate: {
                        current_page: current_page,
                        total_pages: Math.ceil(total_records / limit),
                        total_records: total_records
                    },
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No record found.',
                    _data: result
                }

                response.send(data);
            }

        })
        .catch((getError) => {

            var errors = {};
            for (var i in getError.errors) {
                errors[i] = getError.errors[i].message
            }

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _error: errors,
                _data: []
            }

            response.send(data);
        })
}

exports.orderStatus = async (request, response) => {

    const dataSave = request.body;

    if (request.file) {
        dataSave.image = request.file.filename;
    }

    if (request.body.name) {
        var slug = slugify(request.body.name, {
            lower: true,
            strict: true,
            trim: true
        })

        dataSave.slug = await generateUniqueSlug(categoryModel, slug)
    }

    dataSave.updated_at = Date.now()

    categoryModel.updateOne({
        _id: request.params.id
    }, {
        $set: dataSave
    })
        .then((result) => {
            if (result.matchedCount > 0) {
                const data = {
                    _status: true,
                    _message: 'Record updated succussfully.',
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No record found.',
                    _data: null
                }

                response.send(data);
            }

        })
        .catch((getError) => {

            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: ''
            }

            response.send(data);
        })
}