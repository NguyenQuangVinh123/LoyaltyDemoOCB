const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/api', { target: 'http://127.0.0.1:3001/',
    headers: {
        "Connection": "keep-alive"
    },
    
    
     }))
    app.use(createProxyMiddleware('/uploads', { target: 'http://127.0.0.1:3001/',headers: {
        "Connection": "keep-alive"
    }, }))

}

