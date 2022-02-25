// Dependencies
const express = require('express');

// Point Server to the route files
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/HTML');

// Create an express server
const app = express();

// Set PORT
const PORT = 3001;

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// Parse incoming JSON data
app.use(express.json());


app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listener
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});