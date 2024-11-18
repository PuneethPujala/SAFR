const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create the server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve frontend files

// WebRTC signaling
io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate) => {
        socket.broadcast.emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
