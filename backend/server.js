// Require The Necessary Packages
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Importing Routes, Middleware, etc..
const userRoute = require('./routes/userRoutes');
const therapistRoute = require('./routes/therapistRoutes'); // Import therapist routes
const errorHandler = require('./middleware/errorMiddleware');

// Initializing Express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow cookies to be sent from the frontend
  }));

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/therapists', therapistRoute); 

// Routes
app.get('/', (req, res) => {
    res.send('GET - Home Page (Load homepage)');
})

// Calling the error handler middleware
app.use(errorHandler);

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
