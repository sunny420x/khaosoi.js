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
            res.json = (data, statusCode = 200) => {
                if (res.writableEnded) return;

                res.statusCode = statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
            };

            const key = `${req.method}:${req.url}`;
            const handler = this.routes[key];

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

    on(path, method, handler) {
        this.routes[`${method.toUpperCase()}:${path}`] = handler;
    }

    get(path, handler) {
        this.routes[`GET:${path}`] = handler;
    }

    post(path, handler) {
        this.routes[`POST:${path}`] = handler;
    }
}

module.exports = Lazy;