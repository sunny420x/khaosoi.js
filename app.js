const Lazy = require('./src/lazy')

const app = new Lazy(4000)
app.createApp()

app.on('/', (req,res) => {
    res.write("Welcome to lazy framework")
    res.end()
})