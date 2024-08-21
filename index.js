const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require('dotenv').config(); // Load environment variables from .env file

const connectDB = require('./config/database');
connectDB();

// Define a port
const PORT = process.env.PORT || 3000;

// Set up a basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
