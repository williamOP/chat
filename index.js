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
http.listen(port, function(){
  console.log('listening on port %d', port);
});

io.on('connection', function(socket){
    socket.on('disconnect', function(){
      socket.broadcast.emit('message', {'user': null, 'msg': socket.username + ' has disconnected from the server!'})
    });

    socket.on('message', function(msg){
        io.emit("message", {
          'user': socket.username,
          'msg': msg
        });
    });

    socket.on('join', function (username) {
      socket.username = 'Guest';
      if (username != null) {
        socket.username = username;
      }
      
      socket.broadcast.emit('message', {'user': null, 'msg': socket.username + ' has joined the server!'})
    })
});

io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
});