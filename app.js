//app.js || create express server

var express = require('express');   //pull in express module
var app = express();    //wrap the 'express' function into 'app'
var server = require('http').createServer(app); //create an express server
var io = require('socket.io').listen(server);   //pull in socket.io module
var colors = require('colors');

var port = process.argv[2];    //what port?, input as argument when running node

server.listen(port);    //tell server to listen in on <port>
console.log(colors.rainbow('server listening on port ') + port.toString().green);

//SERVE HTML
app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

//OPEN SOCKET, io.sockets.on = wrapper function
io.sockets.on('connection', function(socket) {

    console.log('Client logged in with ID: ' + socket.id.toString().green + '. ');

    //custom event
    socket.on('send message', function(data) {
        //io.sockets.emit (<string:event>, <data to pass>);
        io.sockets.emit('new message',  "<b>" +socket.id + "</b>" + " says: " + data);   //this needs to be received by the client side
        console.log(socket.id.toString().green + ' says: ' + data);
    });

    //disconnect event
    socket.on('disconnect', function(data){
        console.log('client' + socket.id.toString().red + ' disconnected');
    });
});
