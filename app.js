const khaosoi = require('./src/khaosoi')

const app = new khaosoi(4000)
app.createApp()

//Handling GET request.
app.on('/', 'get', (req,res) => {
    res.render('views/index.html')
})

//Handling POST request.
app.on('/', 'post', async(req,res) => {
    const payload = await req.getBodyPayload()
    const message = payload.find(p => p.key === 'message')?.value
    const sender  = payload.find(p => p.key === 'sender')?.value

    console.log(`${sender}: ${message}`)

    res.end()
})

//Responing JSON Object.
app.on('/docs/getContent', 'get', (req,res) => {
    res.json([
    {
        header: "💫 Handling GET request",
        content: `app.on('/', 'get', (req,res) => { \n res.end('Welcome to Khaosoi.js !!') \n})`
    },
    {
        header: "💫 Handling POST request",
        content: `app.on('/', 'post', (req,res) => { \n res.end('This is POST !!') \n})`
    },
    {
        header: "🍷 Accessing Body Payload",
        content: `app.on('/', 'post', async(req,res) => { \n const payload = await req.getBodyPayload() \n const message = payload.find(p => p.key === 'message')?.value \n const sender  = payload.find(p => p.key === 'sender')?.value \n ... \n res.end() \n})`
    },
    {
        header: "💫 Handling PUT request",
        content: `app.on('/', 'put', (req,res) => { ... })`
    },
    {
        header: "💫 Handling DELETE request",
        content: `app.on('/', 'delete', (req,res) => { ... })`
    },
    ])
})