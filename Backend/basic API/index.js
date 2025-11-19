const http = require('http');
const { categories, brands, productDetails } = require('./data');

const server = http.createServer((request, response) => {

    if(request.url == '/'){
        response.end('<h1>Server is working Fine !!</h1>');
    } else if(request.url == '/category/view' && request.method == 'GET' ){
        
        if(categories.length > 0){
            const data = {
                _status : true,
                _message : 'Record found succussfully !',
                _data : categories
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false,
                _message : 'No record Found !',
                _data : []
            }

            response.end(JSON.stringify(data));
        }

    } else if(request.url == '/brands/view'  && request.method == 'GET'){
        if(brands.length > 0){
            const data = {
                _status : true,
                _message : 'Record found succussfully !',
                _data : brands
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false,
                _message : 'No record Found !',
                _data : []
            }

            response.end(JSON.stringify(data));
        }
    } else if(request.url == '/product-details'  && request.method == 'POST'){
        if(productDetails != ''){
            const data = {
                _status : true,
                _message : 'Record found succussfully !',
                _data : productDetails
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false,
                _message : 'No record Found !',
                _data : ''
            }

            response.end(JSON.stringify(data));
        }
    } else {
        response.end('Page Not Found !!');
    }


    
})

server.listen(5000, () => {
    console.log('Server is working.')
});