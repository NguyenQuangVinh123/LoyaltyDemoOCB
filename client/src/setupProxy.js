const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://127.0.0.1:3001/',
    headers: {
        "Connection": "keep-alive"
    },
    
    
     }))
    app.use(proxy('/uploads', { target: 'http://127.0.0.1:3001/',headers: {
        "Connection": "keep-alive"
    }, }))

}

