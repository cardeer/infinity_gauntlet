const express = require('express')
const port = process.env.PORT || 5000
const app = express()

const fs = require('fs')

function viewDirectory(path){
    const projectPath = path
    const files = fs.readdirSync(projectPath)
    var allFiles = []
    files.forEach(value => {
        const currentPath = projectPath + '/' + value
        const isFolder = fs.lstatSync(currentPath).isDirectory()
        if (isFolder){
            allFiles = allFiles.concat(viewDirectory(currentPath))
        }
        else allFiles.push([ value, currentPath, (fs.lstatSync(currentPath).size / (1024 * 1024)).toFixed(2) ])
    })
    return allFiles
}

app.get('/api/path/:path', (req, res) => {
    const projectPath = Buffer.from(req.params.path, 'base64').toString()
    const files = fs.readdirSync(projectPath)
    var allFiles = []
    // files.forEach(value => {
    //     const currentPath = projectPath + '/' + value
    //     const isFolder = fs.lstatSync(currentPath).isDirectory()
    //     if (isFolder){
    //         allFiles = allFiles.concat(viewDirectory(currentPath))
    //     }
    //     else allFiles.push([ value, currentPath, (fs.lstatSync(currentPath).size / (1024 * 1024)).toFixed(2) ])
    // })
    res.send(files)
})

app.listen(port, () => {console.log('lintening on port: ' + port)})