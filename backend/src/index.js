// Node modules
const http = require('http');
const morgan = require('morgan');
const cors = require('cors');

// Server
const express = require("express");
const connectDB = require('./db/db.index');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();
const server = http.createServer(app);

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


// Routes
app.use(userRoutes, groupRoutes);

// Socket
const { socketController } = require('./socket/socket.controller');

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', socket => socketController(socket, io));

// Main function
async function main() {
    await connectDB();
    app.listen(app.get("port"), () => {
        console.log(`[+] Server on port ${app.get("port")}`);
    });
}

main();