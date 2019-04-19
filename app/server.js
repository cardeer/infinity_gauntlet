const express = require('express')
const port = 3000
const app = express()

app.get('/api', (req, res) => {
    res.send('HELLO')
})

app.listen(port, () => {
    console.log('listening on port: ' + port)
})