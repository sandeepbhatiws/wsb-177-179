const http = require('http');


http.createServer((request, response) => {
    console.log('Welcome');
    response.end('<h1>Server is starting</h1');
})

.listen(5000);