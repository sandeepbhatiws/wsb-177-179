const express = require("express")
const { categories, brands, productDetails } = require('./data');

const server = express(); // to make Executable Function

server.get('/', (request,response) => {
    response.send('Server is working fine !!')
});

server.get('/category/view', (request,response) => {
    if(categories.length > 0){
        const data = {
            _status : true,
            _message : 'Record found succussfully !',
            _data : categories
        }

        response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No record Found !',
            _data : []
        }
        response.send(data);
    }
});


server.listen(5000, () => {
    console.log('Server is working Fine');
})