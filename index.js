const http = require('http')
const express = require('express')
const app = express();
const path = require('path')

// initialising the server
const server = http.createServer(app)

// socket.io integration
const { Server } = require("socket.io");
const io = new Server(server);


app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {

	res.sendFile(path.join(__dirname, 'client', 'index.html'));
})

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

io.on('connection', (socket) => {
	socket.on('chat message', (name, msg) => {
		io.emit('chat message', name, msg);
	});
});

io.on('connection', (socket) => {
	socket.on('chat-notification', () => {
		socket.broadcast.emit('chat-notification');
	});
});

io.on('connection', (socket) => {
	socket.on('user-connected', (name) => {
		io.emit('user-connected', `${name} just joined!`);
	});
});

server.listen(3000, () => {
	console.log('listening on http://localhost:3000')
})