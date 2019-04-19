const fs = require('fs');
const path = require('path');
const io = require('socket.io');
const express = require('express');
const app = express();


function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
};

walkDir('./node_modules', function (filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    console.log(filePath);
});