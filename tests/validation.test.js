// Simulate the request to the API and check the response 
// to ensure that the input validation is working as expected.
const { request, app } = require('./setup');

describe('Input Validation country query - Malicious input', () => {

    test('GET /api/flights/country/count?country=<malicious_input> should sanitize input and return 400', async () => {
        const response = await request(app).get('/api/flights/country/count?country=<script>alert("test")</script>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/country/count?country=<script>alert("test")</script> should sanitize input and return 400', async () => {
        const response = await request(app).get('/api/flights/country/count?country=<script>alert("test")</script>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/country/outbound/count?country=<img src="x" onerror="alert(1)"> should sanitize input and return 400', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count?country=<img src="x" onerror="alert(1)">');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/country/inbound/count?country=<svg/onload=alert(1)> should sanitize input and return 400', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count?country=<svg/onload=alert(1)>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/country/count?country=<script>console.log("test")</script> should ignore country and return 400', async () => {
        const response = await request(app).get('/api/flights/country/count?country=<script>console.log("test")</script>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });
});


describe('Input Validation general SQL Injection', () => {
    test('GET /api/flights/getaway?country=<script>alert("test")</script> should ignore country and return 400', async () => {
        const response = await request(app).get('/api/flights/getaway?country=<script>alert("test")</script>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/delayed/count?country=<script>console.log("test")</script> should ignore country and return 400', async () => {
        const response = await request(app).get('/api/flights/delayed/count?country=<script>console.log("test")</script>');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('GET /api/flights/destination/popular?country=<iframe src="http://malicious.com"> should ignore country and return 400', async () => {
        const response = await request(app).get('/api/flights/destination/popular?country=<iframe src="http://malicious.com">');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });
});



describe('Input Validation - Invalid input', () => {

    test('should return error for invalid country name', async () => {
        const response = await request(app).get('/api/flights/country/count?country=INVALID_COUNTRY');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('should return error for invalid country name (outbound)', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count?country=INVALID_COUNTRY');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });

    test('should return error for invalid country name (inbound)', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count?country=INVALID_COUNTRY');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid country name');
    });
});




describe('Input Validation - Valid input Uppercase', () => {

    test('should return true for a valid country name', async () => {
        const response = await request(app).get('/api/flights/country/count?country=GERMANY');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });

    test('should return true for a valid country name (outbound)', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count?country=GERMANY');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });

    test('should return true for a valid country name (inbound)', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count?country=GERMANY');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });
});



describe('Input Validation - Valid input Lowercase', () => {

    test('should return true for a valid country name in lowercase', async () => {
        const response = await request(app).get('/api/flights/country/count?country=germany');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });

    test('should return true for a valid country name in lowercase (outbound)', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count?country=germany');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });

    test('should return true for a valid country name in lowercase (inbound)', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count?country=germany');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('number');
    });
});



describe('Input Validation - Empty input', () => {

    test('should return false for an empty country name', async () => {
        const response = await request(app).get('/api/flights/country/count?country=');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });

    test('should return false for an empty country name (outbound)', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count?country=');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });

    test('should return false for an empty country name (inbound)', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count?country=');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });
});



describe('Input Validation - Null input', () => {
    test('should return false for a null country name', async () => {
        const response = await request(app).get('/api/flights/country/count');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });

    test('should return false for a null country name (outbound)', async () => {
        const response = await request(app).get('/api/flights/country/outbound/count');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });

    test('should return false for a null country name (inbound)', async () => {
        const response = await request(app).get('/api/flights/country/inbound/count');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Country name is required');
    });
});