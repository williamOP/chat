// client side home page
var socket = null;

var app = new Vue({
    el: '#app',
    data: {
        // 2 way binding
        message: '',
        messages: []
    },
    methods: {
        sendMessage: function() {
            // sends to server
            socket.emit('message', this.message);
            // reset box
            this.message = '';
        }
    },
    created: function() {
        socket = io();
    },
    mounted: function () {
        socket.on('message', function (message) {
            // adds message to messages array
            app.messages.push(message);
        });
    }
  })