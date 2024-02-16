// Require The Necessary Packages
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// Importing Routes, Middleware, etc..
const userRoute = require('./routes/userRoutes');

// Initializing Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Middleware
app.use('/api/users', userRoute);

// Routes
app.get('/', (req, res) => {
    res.send('GET - Home Page (Load homepage)');
})

// Creating the port and connecting to database.
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(
    () =>{
        app.listen(PORT, () => {
            console.log('Connection to the database was successful.')
            console.log(`Server is running on port: ${PORT}`);
        });
    }
)
.catch(err => console.log(err));