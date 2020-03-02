const express = require('express');
const app = express();
const fs = require("fs");
const cors = require('cors');
const bodyParser = require('body-parser');
var http = require('http');
var url = require('url');


const FroalaEditor = require('./node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Uploading files in AWS S3 bucket
app.get('/get_AWSFileUploadUrl', (request, response) => {

    console.log('calling');

    const configs = {
        bucket: 'mp-ecgroup-dev',
        region: 'eu-west-2',
        keyStart: 'uploads/',
        acl: 'public-read',
        accessKey: 'AKIAJ4LMJJIXV4FVUVJQ',
        secretKey: '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'
    };

    const s3Hash = FroalaEditor.S3.getHash(configs);
    response.status(200).send(s3Hash);
});
