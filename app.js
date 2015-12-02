//app.js || create express server

var express = require('express');   //pull in express module
var app = express();    //wrap the 'express' function into 'app'
var server = require('http').createServer(app); //create an express server
var io = require('socket.io').listen(server);   //pull in socket.io module
var colors = require('colors');

var port = 3000;    //what port?

server.listen(port);    //tell server to listen in on <port>
console.log(colors.rainbow('server listening on port ') + port.toString().green);

app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});