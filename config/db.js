const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL); 
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;


//.env
// PORT = 5000
// MONGODB_URL = mongodb+srv://pankajsshah:jJM2YQ97nkS636Av@demo.grkhc.mongodb.net/?retryWrites=true&w=majority&appName=demo
// JWT_SECRET = exy34329472394dbbdbfbs