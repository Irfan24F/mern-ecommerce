require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["https://mern-ecommerce-49jd.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
}));

// MongoDB Connection
let isConnected = false;

async function connectToDatabase() {
    if (isConnected) return;
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected');
}

// Mongoose Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

// API Endpoint
app.get('/api/books', async (req, res) => {
    await connectToDatabase(); // Ensure the DB connection is established
    try {
        const allBooks = await Book.find().lean();
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
