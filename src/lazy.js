const http = require('http');

class Lazy {
    port = 3000
    app = null
    
    constructor(port) {
        this.port = port
        this.routes = {};
    }

    createApp() {
        this.app = http.createServer((req, res) => {
            const handler = this.routes[req.url];

            if (handler) {
                handler(req, res);
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        })

        this.app.listen(this.port, () => {
            console.log(`Lazy is started at http://localhost:${this.port}.`)
        })
    }

    on(url, callback) {
        this.routes[url] = callback;
    }
}

module.exports = Lazy;