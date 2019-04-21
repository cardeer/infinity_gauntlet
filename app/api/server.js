const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

const fs = require("fs");

app.use(cors);

function viewDirectory(path) {
  const projectPath = path;
  const files = fs.readdirSync(projectPath);
  var allFiles = [];
  files.forEach(value => {
    const currentPath = projectPath + "/" + value;
    const isFolder = fs.lstatSync(currentPath).isDirectory();
    if (isFolder) {
      allFiles = allFiles.concat(viewDirectory(currentPath));
    } else
      allFiles.push({
        name: value,
        path: currentPath,
        size: fs.lstatSync(currentPath).size / (1024 * 1024)
      });
  });
  return allFiles;
}

app.get("/api/path/view/:path", (req, res) => {
  try {
    const projectPath = Buffer.from(req.params.path, "base64").toString();
    const files = fs.readdirSync(projectPath);
    var allFiles = [];
    files.forEach(value => {
      const currentPath = projectPath + "/" + value;
      const isFolder = fs.lstatSync(currentPath).isDirectory();
      if (isFolder) {
        allFiles = allFiles.concat(viewDirectory(currentPath));
      } else
        allFiles.push({
          name: value,
          path: currentPath,
          size: fs.lstatSync(currentPath).size / (1024 * 1024)
        });
    });
    res.send(allFiles);
  } catch (e) {
    res.send([]);
  }
});

app.get("/api/path/delete/:path", (req, res) => {
  try {
    const filePath = Buffer.from(req.params.path, "base64").toString();
    fs.unlinkSync(filePath);
    res.send({ ok: true });
  } catch (e) {
    res.send({ ok: false, msg: e.message });
  }
});

app.listen(port, () => {
  console.log("lintening on port: " + port);
});
