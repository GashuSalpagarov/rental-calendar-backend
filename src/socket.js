const socketIo = require('socket.io');

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

module.exports = io;
