const Lazy = require('./src/lazy')

const app = new Lazy(4000)
app.createApp()

//Handling GET request.
app.on('/', 'get', (req,res) => {
    res.end('Welcome to Lazy.js !!')
})

//Handling POST request.
app.on('/', 'post', (req,res) => {
    res.end('This is POST !!')
})

//Responing JSON Object.
app.on('/json', 'get', (req,res) => {
    res.json({
        message: "Hello World!"
    })
})