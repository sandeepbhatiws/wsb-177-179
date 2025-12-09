const mongodb = require('mongodb');
const categoryModel = require('../models/category');

exports.create = async (request, response) => {

    await categoryModel(request.query).save()
    .then((result) => {
        const data = {
            _status: true,
            _message: 'Record created !!',
            _data: result
        }

        response.send(data);
    })
    .catch((getError) => {

        // var errors = [];

        // for(var i in getError.errors){
        //     console.log(getError.errors[i].message);
        //     errors.push(getError.errors[i].message)
        // }

        var errors = {};

        for(var i in getError.errors){
            console.log(getError.errors[i].message);
            errors[i] = getError.errors[i].message
        }


        const data = {
            _status: false,
            _message: 'Something went wrong !!',
            _error : errors,
            _data: null
        }

        response.send(data);
    })
}

exports.view = async (request, response) => {

    var limit = 5;
    var page = 1;
    var skip = 0;

    if(request.query.page){
        page = request.query.page;

        skip = (page - 1) * limit; 
    }

    

    // await categoryModel.find().limit(limit).skip(skip)
        
    // await categoryModel.find().sort({
    //     order : 'asc',
    //     _id : 'desc'
    // })

    // await categoryModel.find({
    //     name : request.query.name,
    // }).sort({
    //     _id : 'desc'
    // })

    const andCondition      = [{
        name : {
            $exists : true
        },
        order : {
            $exists : true
        },
    }];
    const orCondition       = [];
    var filter              = {};

    if(request.query.name != undefined){
        if(request.query.name != ''){
            // var nameRegex = new RegExp("^" + request.query.name);
            var nameRegex = new RegExp(request.query.name, "i");
            andCondition.push({ name : nameRegex })
        }
    }

    if(request.query.order != undefined){
        if(request.query.order != ''){
            orCondition.push({ order : parseInt(request.query.order) })
        }
    }

    if(andCondition.length > 0){
        filter = { $and : andCondition }
    }

    if(orCondition.length > 0){
        filter.$or = orCondition;
    }

    console.log(filter)

    var total_records = await categoryModel.find(filter).countDocuments();

    await categoryModel.find(filter).select('name order image').sort({
        _id : 'desc'
    })


        .then((result) => {
            if (result.length > 0) {
                const data = {
                    _status: true,
                    _message: 'Record fetch !!',
                    _total_records : total_records,
                    _current_page : page,
                    _total_pages : Math.ceil(total_records / limit),
                    _data: result
                }

                response.send(data);
            } else {
                const data = {
                    _status: false,
                    _message: 'No Record Found !!',
                    _data: result
                }

                response.send(data);
            }

        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: null
            }

            response.send(data);
        })
}

exports.update = async (request, response) => {

    await categoryModel.updateOne({
        _id: new mongodb.ObjectId(request.params.id)
    }, {
        $set: request.query
    })
        .then((result) => {
            const data = {
                _status: true,
                _message: 'Record updated !!',
                _data: result
            }

            response.send(data);
        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: null
            }

            response.send(data);
        })
}

exports.destroy = async (request, response) => {

    await categoryModel.deleteOne({
        _id: new mongodb.ObjectId(request.params.id)
    })
        .then((result) => {
            const data = {
                _status: true,
                _message: 'Record deleted !!',
                _data: result
            }

            response.send(data);
        })
        .catch(() => {
            const data = {
                _status: false,
                _message: 'Something went wrong !!',
                _data: null
            }

            response.send(data);
        })
}