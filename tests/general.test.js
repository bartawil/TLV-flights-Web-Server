const { request, app } = require('./setup');
const { performance } = require('perf_hooks');

describe('Error Handling', () => {
  test('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/api/nonexistent');
    expect(response.statusCode).toBe(404);
  });

  test('should return cached data within TTL', async () => {
    const response1 = await request(app).get('/api/flights/count');
    expect(response1.statusCode).toBe(200);

    // Simulate a subsequent request within cache TTL
    const response2 = await request(app).get('/api/flights/count');
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toEqual(response1.body); // Should match cached response
  });

  
  test('should return cached data within TTL and make things faster', async () => {
    // Measure the time for the first request
    const start1 = performance.now();
    const response1 = await request(app).get('/api/flights/delayed/count');
    const end1 = performance.now();
    const time1 = end1 - start1;

    expect(response1.statusCode).toBe(200);

    // Simulate a subsequent request within cache TTL and measure the time
    const start2 = performance.now();
    const response2 = await request(app).get('/api/flights/delayed/count');
    const end2 = performance.now();
    const time2 = end2 - start2;

    expect(response2.statusCode).toBe(200);
    expect(response2.body).toEqual(response1.body); // Should match cached response

    // Check if the second request was faster due to caching
    expect(time2).toBeLessThan(time1);
  });
});
