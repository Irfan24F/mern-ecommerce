require('dotenv').config({ path: './bk.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected');
    seedDatabase(); 
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number,
    image: String,
});

const Book = mongoose.model('Book', bookSchema);

const seedDatabase = async () => {
    try {
        await Book.deleteMany(); 

        const books = [
            { 
                title: 'The Great Gatsby', 
                author: 'F. Scott Fitzgerald', 
                genre: 'Fiction', 
                description: 'A classic novel about the American Dream', 
                price: 20, 
                image: '/uploads/b1.jpg' 
            },
            { 
                title: 'To Kill a Mockingbird', 
                author: 'Harper Lee', 
                genre: 'Fiction', 
                description: 'A powerful story of racial injustice and moral growth', 
                price: 15, 
                image: '/uploads/b2.jpg' 
            },
            { 
                title: '1984', 
                author: 'George Orwell', 
                genre: 'Dystopian', 
                description: 'A dystopian vision of a totalitarian future society', 
                price: 25, // Corrected price
                image: '/uploads/b3.jpg' 
            }, 
            {
                title: 'Inception',
                author: 'Christopher Nolan', // Changed from director to author
                genre: 'Science Fiction',
                description: 'A thief uses dream-sharing technology to plant an idea into a C.E.O.',
                price: 30, // Corrected price
                image: '/uploads/b4.jpg'
            },
            {
                title: 'The Shawshank Redemption',
                author: 'Frank Darabont', // Changed from director to author
                genre: 'Drama',
                description: 'Two imprisoned men bond and find redemption.',
                price: 20, // Corrected price
                image: '/uploads/b5.jpg'
            },
            {
                title: 'The Godfather',
                author: 'Francis Ford Coppola', // Changed from director to author
                genre: 'Crime, Drama',
                description: 'A crime dynasty patriarch transfers control to his son.',
                price: 25, // Corrected price
                image: '/uploads/b6.jpg'
            }
        ];

        await Book.insertMany(books);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// API Endpoint to fetch all books
app.get('/api/books', async (req, res) => {
    try {
        const allBooks = await Book.find();
        res.json(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
