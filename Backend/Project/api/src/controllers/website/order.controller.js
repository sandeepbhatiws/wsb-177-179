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

// {razorpay_payment_id: 'pay_S5kySI4l9w7AjO', razorpay_order_id: 'order_S5kuZ3huzILTPM', razorpay_signature: '05a83e023c99c16a660eaf9225330d15451d5a7a12dcc1511d066229e574bd69'}

exports.view = async (request, response) => {

    var limit = 15;
    var skip = 0;
    var current_page = 1;

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

    var total_records = await orderModel.find(filter).countDocuments();

    await orderModel.find(filter).limit(limit).skip(skip)
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

    var orderInfo = await orderModel.findOne({ order_id : request.body.order_id });

    if(decoded.userInfo._id != orderInfo.user_id){
        const data = {
            _status: false,
            _message: 'Something went wrongg !!',
            _data: ''
        }

        response.send(data);
    }

    var checkPayment = await instance.payments.fetch(request.body.payment_id);

    if(checkPayment.status == 'authorized'){
        var dataUpdate = {
            payment_id : request.body.payment_id,
            order_status : 2,
            payment_status : 2,
        }
        var message = 'Order Placed succussfully.';
        var order_status = 1;
    } else {
        var dataUpdate = {
            payment_id : request.body.payment_id,
            order_status : 6,
            payment_status : 3,
        }
        var message = 'Order Failed.';
        var order_status = 0;
    }

    orderModel.updateOne({
        order_id: request.body.order_id
    }, {
        $set: dataUpdate
    })
    .then((result) => {
        if (result.matchedCount > 0) {
            const data = {
                _status: true,
                _message: message,
                order_status : order_status,
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

        console.log(getError);

        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _data: ''
        }

        response.send(data);
    })
}