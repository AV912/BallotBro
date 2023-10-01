const express = require("express");
const connectDB = require('./db/db.index');

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Main function
async function main() {
    await connectDB();
    app.listen(app.get("port"), () => {
        console.log(`[+] Server on port ${app.get("port")}`);
    });
}

main();