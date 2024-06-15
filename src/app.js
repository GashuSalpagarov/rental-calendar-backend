require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const syncRoutes = require('./routes/syncRoutes');
const http = require('http');
const socketIo = require('socket.io');
const cronJobs = require('./utils/cronJobs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/sync', syncRoutes);

connectDB();

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
