const database = require('../../database.js');
const mongodb = require('mongodb');

exports.create = async (request, response) => {

    const db = await database();

    // db.collection('category').insertOne({
    //     name : request.query.name,
    //     image : request.query.image
    // })

    db.collection('category').insertOne(request.query)
        .then((result) => {
            const data = {
                _status: true,
                _message: 'Record created !!',
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

exports.view = async (request, response) => {

    const db = await database();
    db.collection('category').find().toArray()
        .then((result) => {
            if (result.length > 0) {
                const data = {
                    _status: true,
                    _message: 'Record fetch !!',
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

    const db = await database();

    db.collection('category').updateOne({
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

    const db = await database();

    db.collection('category').deleteOne({
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