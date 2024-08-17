// Test the flight API endpoints
const request = require('supertest');

// Import the nock module to mock API responses
const nock = require('nock');

// Import the app and server instances from the app.js file
const { app, server } = require('../app'); 

// Mock the API response
beforeEach(() => {
  nock('https://data.gov.il')
    .get('/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=300')
    .reply(200, {
      // Mock the API response data as needed
      result: {records: []}
    });
});

// Clean up nock and server after each test
afterEach(async () => {
  nock.cleanAll(); // Clean up nock after each test
  if (server) {
    await new Promise(resolve => server.close(resolve)); // Close the server
  }
});


describe('Flight API Endpoints', () => {
  
  test('GET /api/flights/count should return the total number of flights', async () => {
    const response = await request(app).get('/api/flights/count');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/outbound/count should return the number of outbound flights', async () => {
    const response = await request(app).get('/api/flights/outbound/count');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/inbound/count should return the number of inbound flights', async () => {
    const response = await request(app).get('/api/flights/inbound/count');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/country/count?country=Germany should return the number of flights from Germany', async () => {
    const response = await request(app).get('/api/flights/country/count?country=Germany');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/country/outbound/count?country=germany should return the number of outbound flights from Germany', async () => {
    const response = await request(app).get('/api/flights/country/outbound/count?country=germany');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/country/inbound/count?country=germany should return the number of inbound flights from Germany', async () => {
    const response = await request(app).get('/api/flights/country/inbound/count?country=germany');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/delayed/count should return the number of delayed flights', async () => {
    const response = await request(app).get('/api/flights/delayed/count');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('number');
  });

  test('GET /api/flights/destination/popular should return the most popular destination', async () => {
    const response = await request(app).get('/api/flights/destination/popular');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('string');
  });

  test('GET /api/flights/getaway should return a quick getaway flight pair', async () => {
    const response = await request(app).get('/api/flights/getaway');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
  });
});
