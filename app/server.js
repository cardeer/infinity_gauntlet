const express = require('express')
const port = 3000
const app = express()
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../app/public/index.html"))
})

app.get('/api', (req, res) => {
    res.send('HELLO')
})

app.listen(port, () => {
    console.log('listening on port: ' + port)
})