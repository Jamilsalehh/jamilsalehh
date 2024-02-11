// Require The Necessary Packages
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initializing Express
const app = express();

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