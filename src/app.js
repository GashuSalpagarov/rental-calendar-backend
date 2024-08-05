const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const connectDB = require('./config/db');
// const cronJobs = require('./utils/cronJobs');

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const syncRoutes = require('./routes/syncRoutes');


dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    credentials: true
}));
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
