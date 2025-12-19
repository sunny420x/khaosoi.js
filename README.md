<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/349b0245-3eff-45e3-a14a-7ed3369d214a" />
<h1>Khaosoi.js</h1>
<p>
Look like express.js but it's not!!
</p>
<h2>Usage:</h2>
<pre>const khaosoi = require('./src/khaosoi')
const app = new khaosoi(4000) //Listening on port number 4000.
app.createApp()
</pre>
<h3>Handling GET request</h3>
<pre>app.on('/', 'get', (req,res) => {
    res.end('Welcome to Khaosoi.js !!')
})
</pre>
<h3>Handling POST request</h3>
<pre>app.on('/', 'post', (req,res) => {
    res.end('This is POST !!')
})
</pre>
<h3>Accessing Body Payload</h3>
<pre>app.on('/', 'post', async(req,res) => {
    const payload = await req.getBodyPayload()
    const message = payload.find(p => p.key === 'message')?.value
    const sender  = payload.find(p => p.key === 'sender')?.value
    console.log(`${sender}: ${message}`)
    res.end()
})</pre>
<h3>Handling PUT request</h3>
<pre>app.on('/', 'put', (req,res) => {
    res.end('This is PUT !!')
})
</pre>
<h3>Handling DELETE request</h3>
<pre>app.on('/', 'delete', (req,res) => {
    res.end('This is DELETE !!')
})
</pre>
<h3>Responing with JSON Object</h3>
<pre>app.on('/json', 'get', (req,res) => {
    res.json({
        message: "Hello World!"
    })
})
</pre>
<h3>Bonus!! Handling Express.js styles!!</h3>
<pre>app.get('/json', (req,res) => { ... })
</pre>
<pre>app.post('/json', (req,res) => { ... })
</pre>
<pre>app.put('/json', (req,res) => { ... })
</pre>
<pre>app.delete('/json', (req,res) => { ... })
</pre>