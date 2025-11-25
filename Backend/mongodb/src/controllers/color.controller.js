const database = require('../../database.js');
const mongodb = require('mongodb');

exports.create = async (request, response) => {

    const db = await database();

    db.collection('colors').insertOne(request.body)
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

    var condition = {}

    if (request.body) {
        if (request.body.name != '') {
            condition.name = request.body.name;
        }
    }

    db.collection('colors').find(condition).toArray()
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

exports.details = async (request, response) => {

    const db = await database();

    db.collection('colors').findOne({
        _id: new mongodb.ObjectId(request.params.id)
    })
        .then((result) => {
            if (result) {
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

    db.collection('colors').updateOne({
        _id: new mongodb.ObjectId(request.params.id)
    }, {
        $set: request.body
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

    db.collection('colors').deleteOne({
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