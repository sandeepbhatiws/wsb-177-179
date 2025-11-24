const express = require('express');
const database = require('./database.js');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = express(); // make Executable Function

// parse requests of content-type - application/json
server.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());


server.get('/', (request, response) => {
    response.send('Server is working Fine');
});

server.get('/api/category/create', async(request, response) => {

    const db = await database();

    // db.collection('category').insertOne({
    //     name : request.query.name,
    //     image : request.query.image
    // })

    db.collection('category').insertOne(request.query)
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.get('/api/category/view', async(request, response) => {

    const db = await database();
    db.collection('category').find().toArray()
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch !!',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !!',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.get('/api/category/update/:id', async(request, response) => {

    const db = await database();

    db.collection('category').updateOne({
        _id : new mongodb.ObjectId(request.params.id)
    }, {
        $set : request.query
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.get('/api/category/delete/:id', async(request, response) => {

    const db = await database();

    db.collection('category').deleteOne({
        _id : new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record deleted !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.post('/api/color/create', async(request, response) => {

    const db = await database();

    db.collection('colors').insertOne(request.body)
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record created !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.post('/api/color/view', async(request, response) => {

    const db = await database();

    var condition = {}

    if(request.body){
        if(request.body.name != ''){
            condition.name = request.body.name;
        }
    }

    db.collection('colors').find(condition).toArray()
    .then((result) => {
        if(result.length > 0){
            const data = {
                _status : true,
                _message : 'Record fetch !!',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !!',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.post('/api/color/details/:id', async(request, response) => {

    const db = await database();

    db.collection('colors').findOne({
        _id : new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : 'Record fetch !!',
                _data : result
            }

            response.send(data);
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found !!',
                _data : result
            }

            response.send(data);
        }
        
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.put('/api/color/update/:id', async(request, response) => {

    const db = await database();

    db.collection('colors').updateOne({
        _id : new mongodb.ObjectId(request.params.id)
    }, {
        $set : request.body
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record updated !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.delete('/api/color/delete/:id', async(request, response) => {

    const db = await database();

    db.collection('colors').deleteOne({
        _id : new mongodb.ObjectId(request.params.id)
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : 'Record deleted !!',
            _data : result
        }

        response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : 'Something went wrong !!',
            _data : null
        }

        response.send(data);
    })
});

server.listen(5001, () => {
    console.log('Server is working Fine');
})