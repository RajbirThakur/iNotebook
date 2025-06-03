const mongoose = require('mongoose');

// Paste url for your mongoDB
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

module.exports = connectToMongo;
