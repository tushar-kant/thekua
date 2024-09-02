const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
require('dotenv').config(); 
const authRoutes = require('./routes/auth');


const connectDB = require('./config/database');
connectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/auth', authRoutes);
app.use('/employees', require('./routes/employee'));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
