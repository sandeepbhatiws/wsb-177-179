const http = require('http');

const server = http.createServer((request, response) => {

    console.log(request.url);
    console.log(request.method);

    if(request.url == '/'){
        response.end('<h1>Server is working Fine !!</h1>');
    } else if(request.url == '/category/add' && request.method == 'GET' ){
        
        const data = {
            _status : true,   // true, false
            _message : 'Record created succussfully !',
            _data : []
        }

        response.end(JSON.stringify(data));

    } else if(request.url == '/category/view'){
        response.end('View category API')
    } else {
        response.end('Page Not Found !!');
    }


    
})

server.listen(5000, () => {
    console.log('Server is working.')
});