require('dotenv').config(); // Ensure your .env file has MONGO_URI
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin:["https://mern-ecommerce-1-ten.vercel.app"], 
    methods:["POST","GET"], 
    credentials:true
}));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
        seedDatabase();
    })
    .catch((error) => console.error('MongoDB connection error:', error));

// Mongoose Schema and Model
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

// Seed Database
const seedDatabase = async () => {
    try {
        await Book.deleteMany();

        const books = [
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                genre: 'Fiction',
                description: 'A classic novel about the American Dream',
                price: 600,
                image: '/uploads/b1.jpg',
            },
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                genre: 'Fiction',
                description: 'A powerful story of racial injustice and moral growth',
                price: 1000,
                image: '/uploads/b2.jpg',
            },
            {
                title: '1984',
                author: 'George Orwell',
                genre: 'Dystopian',
                description: 'A dystopian vision of a totalitarian future society',
                price: 500,
                image: '/uploads/b3.jpg',
            },
            {
                title: 'Inception',
                author: 'Christopher Nolan',
                genre: 'Science Fiction',
                description: 'A thief uses dream-sharing technology to plant an idea into a C.E.O.',
                price: 300,
                image: '/uploads/b4.jpg',
            },
            {
                title: 'The Shawshank Redemption',
                author: 'Frank Darabont',
                genre: 'Drama',
                description: 'Two imprisoned men bond and find redemption.',
                price: 400,
                image: '/uploads/b5.jpg',
            },
            {
                title: 'The Godfather',
                author: 'Francis Ford Coppola',
                genre: 'Crime, Drama',
                description: 'A crime dynasty patriarch transfers control to his son.',
                price: 600,
                image: '/uploads/b6.jpg',
            },
        ];

        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// API Endpoints
app.get('/api/books', async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Frontend Fallback
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
