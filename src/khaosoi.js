const http = require("http");
const path = require("path");
const fs = require("fs");

class Khaosoi {
  port = 3000; //Default port.
  app = null;

  constructor(port) {
    this.port = port;
    this.routes = {};
  }

  createApp() {
    this.app = http.createServer((req, res) => {
      res.json = (data) => {
        if (res.writableEnded) return;

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      res.xml = (data) => {
        if (res.writableEnded) return;

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/xml");
        res.end(data);
      };

      res.html = (data) => {
        if (res.writableEnded) return;

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.setHeader("charset", "utf-8");
        res.end(data);
      };

      res.render = (_path) => {
        let file_path = path.join(__dirname + "/../", _path);
        let content = fs.readFileSync(file_path, {
          encoding: "utf8",
          flag: "r",
        });
        res.setHeader("Content-Type", "text/html");
        res.setHeader("charset", "utf-8");
        res.end(content);
      };

      req.getBodyPayload = () => {
        if (req._cachedBody) {
          return Promise.resolve(req._cachedBody);
        }

        return new Promise((resolve, reject) => {
          const chunks = [];

          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => {
            try {
              const body = Buffer.concat(chunks).toString();
              const params = new URLSearchParams(body);

              const result = [];
              for (const [key, value] of params.entries()) {
                result.push({ key, value });
              }

              req._cachedBody = result;
              resolve(result);
            } catch (err) {
              reject(err);
            }
          });

          req.on("error", reject);
        });
      };

      //Handle methods dynamically
      const key = `${req.method}:${req.url}`;
      const handler = this.routes[key];

      if (handler) {
        handler(req, res);
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });

    this.app.listen(this.port, () => {
      console.log(`Khaosoi is started at http://localhost:${this.port}.`);
    });
  }

  on(path, method, handler) {
    this.routes[`${method.toUpperCase()}:${path}`] = handler;
  }

  //Handle expressjs style methods.
  get(path, handler) {
    this.routes[`GET:${path}`] = handler;
  }

  post(path, handler) {
    this.routes[`POST:${path}`] = handler;
  }

  put(path, handler) {
    this.routes[`PUT:${path}`] = handler;
  }

  delete(path, handler) {
    this.routes[`DELETE:${path}`] = handler;
  }
}

module.exports = Khaosoi;
