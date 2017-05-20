/**
 * Usefull script for testing load balancing and auto scaling configurations.
 * Deploy to EC2 server with node installed using "forever" to run server.js
 */
const express = require('express')
    , cors = require('cors')
    , app = express()
    , request = require('request');

const host = 'http://169.254.169.254/latest/meta-data/';

app.get('/meta/:tag', cors(), function (req, res) {

    request(host + req.params.tag, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.end(body);
        }
    })


});

app.get('/exit', cors(), function (req, res) {

    res.send('closing');
    server.close();

});

const server = app.listen(3000, function () {

    const host = server.address().address;
    const port = server.address().port;

    console.log("EC2 app listening at http://%s:%s", host, port);

});