// Used by: tests/*.test.js
const request = require('supertest');

// Import the nock module to mock API responses
const nock = require('nock');

// Import the app and server instances from the app.js file
const { app, server } = require('../app');

// Export shared modules
module.exports = {
  request,
  nock,
  app,
  server,
  setupNock: () => {
    // Mock the API response
    nock('https://data.gov.il')
      .get('/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=300')
      .reply(200, {
        // Mock the API response data as needed
        result: { records: [] }
      });
  }
};

// Global setup for all tests
beforeEach(() => {
  module.exports.setupNock();
});

afterEach(async () => {
  nock.cleanAll(); // Clean up nock after each test
  if (server) {
    await new Promise(resolve => server.close(resolve)); // Close the server
  }
});
