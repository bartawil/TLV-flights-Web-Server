// Import the Express module to create the server
const express = require('express');

// Import the routes defined in routes/index.js
const routes = require('./routes');

// Import the path module to work with file and directory paths
const path = require('path');

// Import the PORT constant from the config/constants.js file
const { PORT } = require('./config/constants');

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up the base URL for the API routes
// All routes defined in routes/index.js will be prefixed with '/api'
app.use('/api', routes);
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on the specified port
server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = { app, server };