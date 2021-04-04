var express = require("express");
var app = express();

app.use(express.static("mia_pag"));

app.get("/me.gpx", (req, res) => {
    fs.access(process.argv[2], () => res.sendFile(process.argv[2]))
})

const fs = require('fs');
var https = require('https')
https.createServer({
    key: fs.readFileSync('private-key.pem'),//keys created with https://nodejs.org/en/knowledge/cryptography/how-to-use-the-tls-module/
    cert: fs.readFileSync('public-cert.pem')
}, app)
    .listen(3000, function () {
        console.log('app in funzione')
    })