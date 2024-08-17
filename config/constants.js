// Define the base URL for the TLV flights API and resource ID for the specific dataset we're interested in
const BASE_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=300';

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Define the time-to-live for the cache in seconds, set to 5 minutes
const CACHE_TTL = 300

module.exports = {
    BASE_URL,
    PORT, 
    CACHE_TTL
};