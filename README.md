<h1>Lazy.js</h1>
<p>
Look like express.js but it's not!!
</p>
<h2>Usage:</h2>
<pre>const Lazy = require('./src/lazy')
const app = new Lazy(4000) //Listening on port number 4000.
app.createApp()
</pre>
<h3>Handling GET request</h3>
<pre>app.on('/', 'get', (req,res) => {
    res.end('Welcome to Lazy.js !!')
})
</pre>
<h3>Handling POST request</h3>
<pre>app.on('/', 'post', (req,res) => {
    res.end('This is POST !!')
})
</pre>
<h3>Responing with JSON Object</h3>
<pre>app.on('/json', 'get', (req,res) => {
    res.json({
        message: "Hello World!"
    })
})
</pre>
<h3>Handling Express.js style!!</h3>
<pre>app.get('/json', (req,res) => {
    res.json({
        message: "This is GET !!!"
    })
})
</pre>
<pre>app.post('/json', (req,res) => {
    res.json({
        message: "This is POST !!!"
    })
})
</pre>