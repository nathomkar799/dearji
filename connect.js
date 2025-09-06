const mongoose = require('mongoose');

const DB_URL = process.env.atlas_URL
const connectDB =async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("✅ MongoDB connected !"); 
    } catch (err) {
        console.log("❌ Something went wrong !", err.message);
        process.exit(1);
    }
};  

module.exports = connectDB;