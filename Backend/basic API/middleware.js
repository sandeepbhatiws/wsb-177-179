exports.validation = (request, response, next) => {
     if(request.query.username == '' || request.query.password == ''){
        const data = {
            _status : false,
            _message : 'Required filed is missing !',
            _data : []
        }
        response.send(data);
    }

    if(request.query.username != 'admin' || request.query.password != '1234567890'){
        const data = {
            _status : false,
            _message : 'Invalid Credentails !',
            _data : []
        }
        response.send(data);
    }

    next()
} 