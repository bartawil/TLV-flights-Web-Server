// Import the Express module to define routes
const express = require('express');

// Create a new router instance
const router = express.Router();

// Import the functions that handle the API logic from flightsController.js
const {
    countFlights,
    countOutboundFlights,
    countInboundFlights,
    countFlightsFromCountry,
    countOutboundFlightsFromCountry,
    countInboundFlightsFromCountry,
    countDelayedFlights,
    mostPopularDestination,
    findQuickGetawayFlights
} = require('../controllers/flightsController');

// Define a route for counting all flights (inbound and outbound)
// When a GET request is made to /api/flights/count, the countFlights function is called
router.get('/flights/count', countFlights);

// Define a route for counting outbound flights only
// When a GET request is made to /api/flights/outbound/count, the countOutboundFlights function is called
router.get('/flights/outbound/count', countOutboundFlights);

// Define a route for counting inbound flights only
// When a GET request is made to /api/flights/inbound/count, the countInboundFlights function is called
router.get('/flights/inbound/count', countInboundFlights);

// Define a route for counting flights (inbound and outbound) from a specific country
// When a POST request is made to /api/flights/country/count, the countFlightsFromCountry function is called
router.get('/flights/country/count', countFlightsFromCountry);


// Define a route for counting outbound flights from a specific country
// When a GET request is made to /api/flights/country/outbound/count, the countOutboundFlightsFromCountry function is called
router.get('/flights/country/outbound/count', countOutboundFlightsFromCountry);


// Define a route for counting inbound flights from a specific country
// When a GET request is made to /api/flights/country/inbound/count, the countInboundFlightsFromCountry function is called
router.get('/flights/country/inbound/count', countInboundFlightsFromCountry);


// Define a route for counting delayed flights
// When a GET request is made to /api/flights/delayed/count, the countDelayedFlights function is called
router.get('/flights/delayed/count', countDelayedFlights);


// Define a route for finding the most popular destination
// When a GET request is made to /api/flights/destination/popular, the mostPopularDestination function is called
router.get('/flights/destination/popular', mostPopularDestination);


// Define a route for finding a quick getaway flight pair
// When a GET request is made to /api/flights/getaway, the findQuickGetawayFlights function is called
router.get('/flights/getaway', findQuickGetawayFlights);


// Export the router so it can be used in index.js
module.exports = router;
