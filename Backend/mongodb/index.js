const express = require('express');
const database = require('./database.js');

const server = express(); // make Executable Function

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

server.listen(5001, () => {
    console.log('Server is working Fine');
})