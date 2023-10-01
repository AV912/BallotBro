const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const Group = require('./../models/group.model');

async function verifyToken(token) {
    try {
        // Check if the user has a token
        if (!token || token.length < 10) return null;

        // Decode token
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

        return await User.findById(decoded.id);
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function socketController(socket, io) {
    const user = await verifyToken(socket.handshake.headers['access-token']);
    if (!user) return socket.disconnect();

    console.log('New connection');
}

module.exports = {
    socketController
}