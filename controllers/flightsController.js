// Import the axios module to make HTTP requests
const axios = require('axios');
// Import the BASE_URL, CACHE_TTL, COUNTRIES_SET constant from the config/constants.js file
const { BASE_URL, CACHE_TTL, COUNTRIES_SET } = require('../config/constants');
// Import the NodeCache module to cache the flight data
const NodeCache = require('node-cache');


// Create a new cache instance
const cache = new NodeCache();

// Helper function to fetch flight data from the API
// This function makes a GET request to the API and returns the flight records
const fetchData = async () => {
    // Check if the data is in the cache
    let flights = cache.get('flightsData');

    if (!flights) {
        // If not in cache, fetch from the API
        try {
            const response = await axios.get(BASE_URL);
            const data = response.data.result;
            flights = data.records;

            // Store the fetched data in the cache
            cache.set('flightsData', flights, CACHE_TTL);
        } catch (error) {
            console.error('Error fetching flight count:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    return flights;   
};


// Controller function to count all flights (inbound and outbound)
// This function is called when a GET request is made to /api/flights/count
const countFlights = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data
        res.json(flights.length); // Respond with the total count of flights
    } catch (error) {
        console.error(`Error fetching flights count:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to count outbound flights only
// This function is called when a GET request is made to /api/flights/outbound/count
const countOutboundFlights = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data
        const outboundFlights = flights.filter(flight => flight.CHCKZN); // Filter for outbound flights
        res.json(outboundFlights.length); // Respond with the count of outbound flights
    } catch (error) {
        console.error(`Error fetching outbound flights count`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to count inbound flights only
// This function is called when a GET request is made to /api/flights/inbound/count
const countInboundFlights = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data
        const inboundFlights = flights.filter(flight => !flight.CHCKZN); // Filter for inbound flights
        res.json(inboundFlights.length); // Respond with the count of inbound flights
    } catch (error) {
        console.error(`Error fetching inbound flights count:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to count flights (inbound and outbound) from a specific country
// This function is called when a GET request is made to /api/flights/country/count
// accept the country as a query parameter
const countFlightsFromCountry = async (req, res) => {
    try {
        const country = req.query.country ? req.query.country.toUpperCase() : '';
        if (!country) {
            return res.status(400).json({ error: 'Country name is required' });
        }

        const flights = await fetchData(); // Fetch all flight data
        const countryFlights = flights.filter(flight => flight.CHLOCCT === country); // Filter flights by country name

        res.json(countryFlights.length); // Respond with the count of flights from the specified country
    } catch (error) {
        console.error(`Error fetching flights from ${country}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to count outbound flights from a specific country
// This function is called when a GET request is made to /api/flights/country/outbound/count
const countOutboundFlightsFromCountry = async (req, res) => {
    try {
        const country = req.query.country ? req.query.country.toUpperCase() : '';
        if (!country) {
            return res.status(400).json({ error: 'Country name is required' });
        }

        const flights = await fetchData(); // Fetch all flight data
        const outboundFlights = flights.filter(flight => flight.CHLOCCT === country && flight.CHCKZN); // Filter outbound flights by country name

        res.json(outboundFlights.length); // Respond with the count of outbound flights from the specified country
    } catch (error) {
        console.error(`Error fetching outbound flights from ${country}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to count inbound flights from a specific country
// This function is called when a GET request is made to /api/flights/country/inbound/count
const countInboundFlightsFromCountry = async (req, res) => {
    try {
        const country = req.query.country ? req.query.country.toUpperCase() : '';
        if (!country) {
            return res.status(400).json({ error: 'Country name is required' });
        }

        const flights = await fetchData(); // Fetch all flight data
        const inboundFlights = flights.filter(flight => flight.CHLOCCT === country && !flight.CHCKZN); // Filter inbound flights by country name

        res.json(inboundFlights.length); // Respond with the count of inbound flights from the specified country
    } catch (error) {
        console.error(`Error fetching inbound flights from ${country}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to check if a flight is delayed
const isDelayed = (estimatedDeparture, actualDeparture) => {
    if (!estimatedDeparture || !actualDeparture) return false;
    return new Date(actualDeparture) > new Date(estimatedDeparture);
};

// Controller function to count delayed flights
// This function is called when a GET request is made to /api/flights/delayed/count
const countDelayedFlights = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data

        // Filter flights to count only those that are delayed
        const delayedFlights = flights.filter(flight => 
            isDelayed(flight.CHSTOL, flight.CHPTOL)
        );

        res.json(delayedFlights.length); // Respond with the count of delayed flights
    } catch (error) {
        console.error(`Error fetching delayed flights:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Controller function to find the most popular destination
// This function is called when a GET request is made to /api/flights/popular/destination
const mostPopularDestination = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data
        
        // Filter outbound flights and group them by destination city
        const destinationCounts = flights
            .filter(flight => flight.CHCKZN) // Only consider outbound flights
            .reduce((acc, flight) => {
                const city = flight.CHLOC1T; // Use city name in English
                if (city) {
                    acc[city] = (acc[city] || 0) + 1;
                }
                return acc;
            }, {});

        // Find the city with the maximum count
        const mostPopular = Object.entries(destinationCounts)
            .reduce((max, [city, count]) => count > max.count ? { city, count } : max, { city: null, count: 0 });

        res.json(mostPopular.city || 'No data available'); // Respond with the most popular city
    } catch (error) {
        console.error(`Error fetching most populer dest:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to check if a flight pair is feasible
const isFeasiblePair = (departureFlight, arrivalFlight) => {
    return new Date(departureFlight.CHPTOL) < new Date(arrivalFlight.CHSTOL);
};

// Controller function to find a quick getaway pair of flights
// This function is called when a GET request is made to /api/flights/getaway
const findQuickGetawayFlights = async (req, res) => {
    try {
        const flights = await fetchData(); // Fetch all flight data

        // Filter for flights departing from Israel and arriving in Israel
        const departingFromIsrael = flights.filter(flight => flight.CHCKZN);

        const arrivingInIsrael = flights.filter(flight => !flight.CHCKZN);

        let result = {};
        
        // Find a pair of flights that satisfies the condition
        for (const departure of departingFromIsrael) {
            for (const arrival of arrivingInIsrael) {
                if (departure.CHLOC1 === arrival.CHLOC1 && isFeasiblePair(departure, arrival)) {
                    result = {
                        departure: `${departure.CHOPER}${departure.CHFLTN}`,
                        arrival: `${arrival.CHOPER}${arrival.CHFLTN}`
                    };
                    break;
                }
            }
            if (result.departure) break;
        }

        res.json(result); // Respond with the found flight pair or an empty object
    } catch (error) {
        console.error(`Error getting quick getaway:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// Export the controller functions so they can be used in routes/index.js
module.exports = {
    countFlights,
    countOutboundFlights,
    countInboundFlights,
    countFlightsFromCountry,
    countOutboundFlightsFromCountry,
    countInboundFlightsFromCountry,
    countDelayedFlights,
    mostPopularDestination,
    findQuickGetawayFlights,
};
