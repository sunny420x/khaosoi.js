const khaosoi = require('./src/khaosoi')

const app = new khaosoi(4000)
app.createApp()

//Handling GET request.
app.on('/', 'get', (req,res) => {
    res.html(`<h1>Welcome to Khaosoi.js 🍜 Made with love from developer to developer ❤️</h1>`)
})

//Handling POST request.
app.on('/', 'post', (req,res) => {
    req.getBodyPayload((payload) => {
        console.log(payload)
    })
    res.end()
})

//Responing JSON Object.
app.on('/json', 'get', (req,res) => {
    res.json({
        message: "Khaosoi Aroi mak! 🤪"
    })
})