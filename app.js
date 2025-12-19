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
app.on('/json', 'get', (req,res) => {
    res.json({
        message: "Khaosoi Aroi mak! 🤪"
    })
})