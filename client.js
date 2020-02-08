// client side home page
var socket = null;

var app = new Vue({
    el: '#app',
    data: {
        // 2 way binding
        message: '',
        messages: [],
        username: undefined,
        state: 0
    },
    methods: {
        sendMessage: function() {
            if (this.message.length>0) {
                // sends to server
                socket.emit('message', this.message);
            }
            // reset box
            this.message = '';
        },
        setUsername: function (username) {
            socket.emit('join', this.username);
            this.username = '';
            this.state = 1;
        }
    },
    created: function() {
        socket = io();
    },
    mounted: function () {
        socket.on('message', function (message) {
            // adds message to messages array
            app.messages.push(message);
            // runs after website updated 
            app.$nextTick(function() {
                var messageBox = document.getElementById('chatBox');
                messageBox.scrollTop = messageBox.scrollHeight;
            })
        });
    }
  })