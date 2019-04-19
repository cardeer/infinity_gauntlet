const express = require('express')
const port = process.env.PORT || 5000
const app = express()

const fs = require('fs')

app.get('/path/:path', (req, res) => {
    const projectPath = Buffer.from(req.params.path, 'base64').toString()
    const files = fs.readdirSync(projectPath)
    res.send(files)
})

app.listen(port, () => {console.log('lintening on port: ' + port)})