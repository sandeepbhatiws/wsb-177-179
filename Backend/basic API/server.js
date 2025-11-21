const express = require("express")
const { categories, brands, productDetails } = require('./data');
const { validation } = require("./middleware");

const server = express(); // to make Executable Function

const route = express.Router();
route.use(validation)

server.get('/', (request,response) => {
    response.send('Server is working fine !!')
});

server.get('/category/view', validation , (request,response) => {

    console.log(request.query);

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

route.get('/brand/view', (request,response) => {
    if(brands.length > 0){
        const data = {
            _status : true,
            _message : 'Record found succussfully !',
            _data : brands
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

server.use('/', route);


server.listen(5000, () => {
    console.log('Server is working Fine');
})