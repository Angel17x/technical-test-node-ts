import request from 'supertest';
import app from '../src/app'; // Adjust the import path as necessary

describe('App Tests', () => {
  // Check API connectivity
  it('should connect to the API', async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(200);
  });

  // Check handling of non-existent routes
  it('should handle not found routes', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
  });

  // Check CORS headers
  it('should apply CORS headers', async () => {
    const response = await request(app).get('/api'); // Confirm this endpoint is correct and active
    expect(response.headers['access-control-allow-origin']).toBeDefined();
    expect(response.headers['access-control-allow-origin']).toEqual('*');
  });

  // Check security headers from Helmet
  it('should secure HTTP headers', async () => {
    const response = await request(app).get('/api');
    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
    expect(response.headers['x-frame-options']).toBeDefined();
  });

  // Check JSON body parsing
  it('should parse JSON body', async () => {
    const response = await request(app)
      .post('/api/test') // Confirm this is the correct endpoint
      .send({ email: 'test@test.com', password: 'test1234' })
      .set('Accept', 'application/json');
    expect(response.status).toBe(200); // Ensure this endpoint is supposed to return 200
    expect(response.body).toHaveProperty('message'); // Verifica que el token está presente
  });
});