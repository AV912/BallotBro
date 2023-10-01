const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log('[+] DataBase connected!');
    } catch (error) {
        console.log('[-] Error in Database connection: ' + error);
    }
};

module.exports = connectDB;