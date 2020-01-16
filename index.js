// run in server
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// serves static files from style directory 
app.use('/', express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 3000;
http.listen(3000, function(){
  console.log('listening on port %d', port);
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(msg){
        io.emit("message", msg);
    });
});

io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
});