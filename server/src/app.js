const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

const routes = require('./route');

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Blogging Platform API');
});

app.use('/api/', routes);

module.exports = app;